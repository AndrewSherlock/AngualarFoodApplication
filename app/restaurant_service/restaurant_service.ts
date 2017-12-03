
import {Injectable} from '@angular/core';

import {Review} from '../review/review';


@Injectable()
export class RestaurantService
{
    private restaurantList : Restaurant[] = [];
    
    constructor()
    {   
       /* this.getJsonText(); */
       
        let rg = new RestaurantGenerator();
        this.restaurantList = rg.getRestaurantListWithoutJson();
        
      
    }
    
     getJsonText()
    {
        let text;
        var self = this;
   
    
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/restaurants.json', true);
        
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsText(request.response);
      
            reader.onload =  (e) =>{
                text = reader.result;
                text = JSON.parse(text);
            
                for(let i = 0; i < text['rest_list']['restaurants'].length; i++)
                {
                    self.restaurantList[i] = new Restaurant(
                        text['rest_list']['restaurants'][i].id, 
                        text['rest_list']['restaurants'][i].name,
                        text['rest_list']['restaurants'][i].address,
                        text['rest_list']['restaurants'][i].phone,
                        text['rest_list']['restaurants'][i].town,
                        text['rest_list']['restaurants'][i].countyid,
                        text['rest_list']['restaurants'][i].cuisinetype
                    );
                }
                
                console.log(self);
            };  
        };
        request.send(); 
      
    }
    
    
    getRestaurantList() : Restaurant[]
    {
        return this.restaurantList;   
    }
    
    getRestaurantByCounty(county : number)
    {
        let countyRestaurants : Restaurant[] = [];
        
        for(let i = 0; i < this.restaurantList.length; i++)
        {
            if(this.restaurantList[i].countyid == county)
            {
                countyRestaurants.push(this.restaurantList[i]);
            }
        }
        
        return countyRestaurants; // needs to be changed back to work right
    }
    
    getRestaurantById(restId : number) : Restaurant
    {
        for(let i = 0; i < this.restaurantList.length; i++)
        {
            if(restId == this.restaurantList[i].id)
            {
                return this.restaurantList[i];
            }
        }
    }
    
     getRestaurantByRanking() : Restaurant[]
    {
        let max = 0;
        let temp = this.restaurantList;
        let rank: Restaurant[] = [];
        if(this.restaurantList.length > 10)
        {
            max = 12;
        } else{
            max = this.restaurantList.length;
        }
        
        for(let i = 0; i < max; i++)
        {
            let currentHighest = temp[0];
            let element = 0;
                            
            for(let p = 1; p < this.restaurantList.length;p++)
            {
                console.log(i + " => " + p);
                if(temp[p].getScore() > currentHighest.getScore())
                {
                    element = p;
                    currentHighest = temp[p];
                    
                }
            }
            
            rank[rank.length] = currentHighest;
            temp.splice(element, 1);
        }
        return rank;
    }
    
}

@Injectable()
export class Restaurant
{
    public review : Review[] = [];
    public openingTimes : String[] = [];
    private score : Number = 0;
    
    private wifi : boolean = false;
    private babyChanging : boolean = false;
    
    private menu : Menu;
    
    public long : Number;
    public lat : Number;
    
    constructor(public id : Number, public name : String, public address: String, public phone: String, public town: String, public countyid : number, public cuisineType : String)
    {
        this.getAverageReviewScore();
        this.menu = new Menu();
        
        if((Math.random() * 2) > 1)
        {
            this.wifi = true;
        }
        
         if((Math.random() * 2) > 1)
        {
            this.babyChanging = true;
        }
        
    }
    
    getScore() : Number
    {
        this.getAverageReviewScore();
        let rounded : Number = parseFloat(this.score.toFixed(1));
        return rounded;
    }
    
    setScore(value : number)
    {
        this.score = value;
    }
  
    
    getReviewsFromFile()
    {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/comments/comments'+ this.id + '.json', true);
            
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsText(request.response);
      
            reader.onload =  (e) =>{
                text = reader.result;
                text = JSON.parse(text);
            
                for(let i = 0; i < text['commentList']['comment'].length; i++)
                {
                    self.review[i] = new Review(text['commentList']['comment'][i].rating, text['commentList']['comment'][i].comment, text['commentList']['comment'][i].commenter);     
                }
            };  
        };
        request.send(); 
    }
    
    getOpeningTimesFromFile()
    {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/openingTimes.json', true);
            
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsText(request.response);
      
            reader.onload =  (e) =>{
                text = reader.result;
                text = JSON.parse(text);
            
                for(let i = 0; i < text['openingTimes']['open'].length; i++)
                {
                    self.openingTimes[i] = text['openingTimes']['open'][i].value;     
                }
            };  
        };
        request.send(); 
    }
        
    
    
    getAverageReviewScore()
    {
        let total : number = 0;
        
        if(this.review.length == 0)
            return 0;
        
        for(let i = 0; i < this.review.length;i++)
        {
            total +=  this.review[i].numOfStars;
        }
        
        this.score = total / this.review.length;
    }
    
    getReviews() : Review[]
    {
        return this.review;
    }
    
    addReview(review : Review)
    {
        this.review[this.review.length] = review;
    }
    
    public setMap(lat : Number, long : Number)
    {
        this.long = long;
        this.lat = lat;
    }
}

export class Menu{
 
    public starters : Product[] = [];
    public dinners: Product[] = [];
    public deserts: Product[] = [];
    public drinks: Product[] = [];
    
    public menuAvg : number = 0;
    
    constructor()
    {
        //this.getMenuFromFile();
        this.getFixedMenu();
        this.getAveragePrice();
    }
    
    getMenuFromFile()
    {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/menu.json', true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsText(request.response);
      
            reader.onload =  (e) =>{
                text = reader.result;
                text = JSON.parse(text);
            
                for(let i = 0; i < text['menu']['starters'].length; i++)
                {
                    self.starters[i] = new Product(text['menu']['starters'][i].name, text['menu']['starters'][i].price); 
                }
                
                 for(let i = 0; i < text['menu']['main'].length; i++)
                {
                    self.dinners[i] = new Product(text['menu']['main'][i].name, text['menu']['main'][i].price); 
                }
                
                 for(let i = 0; i < text['menu']['deserts'].length; i++)
                {
                    self.deserts[i] = new Product(text['menu']['deserts'][i].name, text['menu']['deserts'][i].price); 
                }
                
                 for(let i = 0; i < text['menu']['drinks'].length; i++)
                {
                    self.drinks[i] = new Product(text['menu']['drinks'][i].name, text['menu']['drinks'][i].price); 
                }
            };  
        };
        request.send();  
    }
    
    private getFixedMenu()
    {
        let sMenu : Product[] = [
            new Product("Italian Bruschetta",3.90),
            new Product("Chorizo & Prawn Picante", 5.25),
            new Product("Fish Cake", 4.20),
            new Product("East Coast Mussels", 6.00),
            new Product("Chicken wings", 6.75),
            new Product("Brie Cheese", 6.10),
            new Product("Antipasti", 6.50)
            
        ];
        
        this.starters = sMenu;
        
        
          
        let dMenu : Product[] = [
            new Product("Wicklow Lamb Chops", 23.90),
            new Product("Medallions of Beef", 25.25),
            new Product("Sirlion Steak", 24.20),
            new Product("Beef Burger", 17.00),
            new Product("Tagliatelle Primavera", 16.75),
            new Product("Seabass", 20.10),
            new Product("Pizza Margherita", 12.50)
        ];
        
        this.dinners = dMenu;
       
        let desMenu : Product[] = [
            new Product("Selection of Irish Farmhouse Cheeses", 13.90),
            new Product("Oreo Cookie and Vanilla Bean Cheesecake", 10.25),
            new Product("Apple Crumble Pie", 9.20),
            new Product("Christmas Trifle with Raspberry Roulade", 11.00)    
        ];   
        this.deserts = desMenu;
    
        let drMenu : Product[] = [
            new Product("Coors Light", 3.90),
            new Product("Soda", 2.25),
            new Product("Tea", 2.50),
            new Product("Coffee", 3.00)
        ];
              
        this.drinks = drMenu;
          
    }
    
    getAveragePrice()
    {
      let sum = 0;
      sum += this.avgArray(this.starters);
      sum += this.avgArray(this.dinners);
      sum += this.avgArray(this.deserts);
      sum += this.avgArray(this.drinks);
    
      let ans = sum/4;
        
      this.menuAvg = parseFloat(ans.toFixed(1));  
    }
            
    avgArray(array : Product[]) : number
    {
        let sum = 0;
         
        for(let i = 0; i < array.length;i++)
        {
            sum += array[i].price;
        }
        
        return sum / array.length
    }
    
}

export class Product
{
    constructor(public name : String, public price : number){}
}



//*********************************************************************************************//

export class RestaurantGenerator
{
    constructor(){}
    
    public getRestaurantListWithoutJson() : Restaurant[]
    {
        let restList : Restaurant[] = [];
        // 1
        let restaurant = new Restaurant(0, "Maguires Cafe", "Hill of Tara", "046-9025534", "Navan", 0, "cafe");
        let numbers : number[] = [1,5,7];
        restaurant.review = this.getReview(numbers);
        let opening : number[] = [4,5,6,7,8,9,10];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.5809588,-6.6095879);
        restList.push(restaurant);
        
        //2
        restaurant = new Restaurant(1, "Holly's Kitchen", "Main Street", "046-9015234", "Navan", 0, "greasy spoon");
        restaurant.getReviews();
        numbers = [10,20,6];
        restaurant.review = this.getReview(numbers);
        opening = [10,1,1,1,3,1,4];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.6524692,-6.6878097);
        restList.push(restaurant);
        
        //3
        restaurant = new Restaurant(2, "An Sibin", "Main Street", "01-9455234", "Dunshauglin", 0, "pub grub");
        restaurant.getReviews();
        numbers = [3, 2, 15, 21];
        restaurant.review = this.getReview(numbers);
        opening = [12,12,12,15,15,14,12];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.5102513,-6.542007);
        restList.push(restaurant);
        
        //4
        restaurant = new Restaurant(3, "La Bucca", "Main Street", "01-8255120", "Dunboyne", 0, "italian");
        restaurant.getReviews();
        numbers = [];
        restaurant.review = this.getReview(numbers);
        opening = [2,2,2,4,4,4,6];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.4188011,-6.4763817);
        restList.push(restaurant);
        
        //5
        restaurant = new Restaurant(4, "The County Club", "Dunshauglin", "01-8252421", "Dunshauglin", 0, "pub grub");
        restaurant.getReviews();
        numbers = [19, 22];
        restaurant.review = this.getReview(numbers);
        opening = [0,0,0,0,1,1,1];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.4768042,-6.504499);
        restList.push(restaurant);
        
        6//
        restaurant = new Restaurant(5, "La Vida Restaurant Ratoath", "The Courtyard, Main Street", "01-8252421", "Ratoath", 0, "italian");
        restaurant.getReviews();
        numbers = [4, 13, 18];
        restaurant.review = this.getReview(numbers);
        opening = [12,12,12,15,15,13,11];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.5039448,-6.4671834);
        restList.push(restaurant);
        
        //7
        restaurant = new Restaurant(6, "Las Tapas De Lola", "12 Wexford Street", "01-3252281", "Dublin", 1, "cafe");
        restaurant.getReviews();
        numbers = [16, 13, 11, 8, 14];
        restaurant.review = this.getReview(numbers);
        opening = [4,4,4,6,6,6,9];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3369728,-6.2675766);
        restList.push(restaurant);
        
        //8
        restaurant = new Restaurant(7, "Little Jerusalem", "3 Wynnefield road", "01-6252321", "Rathmines", 1, "ethnic");
        restaurant.getReviews();
        numbers = [1];
        restaurant.review = this.getReview(numbers);
        opening = [3,2,2,5,8,8,1];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.322141,-6.2686916);
        restList.push(restaurant);
        
        
        //9
        restaurant = new Restaurant(8, "Leo Burdock", "2 Werburgh Street", "01-12363003", "Dublin", 1, "chipper");
        restaurant.getReviews();
        numbers = [0, 2, 8];
        restaurant.review = this.getReview(numbers);
        opening = [3,3,3,6,6,6,9];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3221903,-6.3015222);
        restList.push(restaurant);
        
        //10
        restaurant = new Restaurant(9, "Little Ass Burrito Bar", "32 Dawson Street", "01-5399203",  "Dublin", 1, "mexican");
        restaurant.getReviews();
        numbers = [22, 12];
        restaurant.review = this.getReview(numbers);
        opening = [3,3,3,5,5,5,8];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3309265,-6.2715397);
        restList.push(restaurant);
        
        //11
        restaurant = new Restaurant(10, "Gourmet Burger Kitchen", "5 Anne Street", "01-2993920", "Dublin", 1, "burger bar");
        restaurant.getReviews();
        numbers = [3, 4, 8, 10];
        restaurant.review = this.getReview(numbers);
        opening = [9,8,8,7,6,6,6];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3309852,-6.2978042);
        restList.push(restaurant);
        
        //12
        restaurant = new Restaurant(11, "Ryans and F.X. Buckley Steakhouse", "Parkgate St", "01-93939102", "Dublin", 1, "steak house");
        restaurant.getReviews();
        numbers = [11, 19, 23];
        restaurant.review = this.getReview(numbers);
        opening = [11,12,12,12,2,2,2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3481699,-6.2957846);
        restList.push(restaurant);
        
        //13
        restaurant = new Restaurant(12, "Alvitos Italian Restaurant", "Main St", "01-9282831", "Leixlip", 2, "italian");
        restaurant.getReviews();
        numbers = [10, 20, 22];
        restaurant.review = this.getReview(numbers);
        opening = [13,13,13,7,7,7,7];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3643214,-6.4905726);
        restList.push(restaurant);
        
        //14
        restaurant = new Restaurant(13, "Red Torch Ginger Maynooth", "Main St", "01-531 0022", "Maynooth", 2, "italian");
        restaurant.getReviews();
        numbers  = [5, 6];
        restaurant.review = this.getReview(numbers);
        opening = [9,9,9,7,7,7,2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.381579,-6.5924996);
        restList.push(restaurant);
        
        //15
        restaurant = new Restaurant(14, "The Village Inn Pub", "Main St, Celbridge Abbey", "01-628 8836", "Celbridge", 2, "pub grub");
        restaurant.getReviews();
        numbers = [2, 15, 18];
        restaurant.review = this.getReview(numbers);
        opening = [10,10,11,14,14,14,10];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3629671,-6.490397);
        restList.push(restaurant);
        
        //16
        restaurant = new Restaurant(15, "Timeless Café", "Church St, Kilcock", "01-628 4392", "Kilcock", 2, "cafe");
        restaurant.getReviews();
        numbers = [20, 12, 1];
        restaurant.review = this.getReview(numbers);
        opening = [0,0,0,1,1,1,1];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.4015055,-6.6718679);
        restList.push(restaurant);
        
        //17
        restaurant = new Restaurant(16, "Stone Haven Restaurant", "Mill St", "01-629 1229", "Maynooth", 2, "cafe");
        restaurant.getReviews();
        numbers  = [4, 8];
        restaurant.review = this.getReview(numbers);
        opening = [3, 3,3,3,9,9,9];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3812749,-6.5951625);
        restList.push(restaurant);
        
        //18
        restaurant = new Restaurant(17, "Da Vinci's Italian Restaurant", "Main St", "01-624 4908", "Leixlip", 2, "italian");
        restaurant.getReviews();
        numbers = [19, 12];
        restaurant.review = this.getReview(numbers);
        opening  = [4,4,4,4,1,1,1]
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.3634562,-6.4935307);
        restList.push(restaurant);
        
        //19
        restaurant = new Restaurant(18, "Brasserie On The Corner", "25 Eglinton St", "091-530 333", "Galway", 3, "steak house");
        restaurant.getReviews();
        numbers = [13, 3, 6];
        restaurant.review = this.getReview(numbers);
        opening = [0,0,0,1,1,1,2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.2746732,-9.0550727);
        restList.push(restaurant);
        
        //20
        restaurant = new Restaurant(19, "The Quay Street Kitchen", "Unit B The Halls, Quay Street", "091-865 680", "Galway", 3, "steak house");
        restaurant.getReviews();
        numbers = [12, 17, 19];
        restaurant.review = this.getReview(numbers);
        opening = [3,3,3,4,4,5,5];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.271026,-9.0563603);
        restList.push(restaurant);
        
        //21
        restaurant = new Restaurant(20, "Kai Restaurant", "20 Sea Rd", "091-865 680", "Galway", 3, "cafe");
        restaurant.getReviews();
        numbers = [2];
        restaurant.review = this.getReview(numbers);
        opening = [14,15,12,13,13,13,10];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.2695867,-9.0633211);
        restList.push(restaurant);
        
        //22
        restaurant = new Restaurant(21, "McSwiggans Bar & Restaurant", "Galway", "091-568 917", "Galway", 3, "pub grub");
        restaurant.getReviews();
        numbers = [];
        restaurant.review = this.getReview(numbers);
        opening = [11,14,14,14,14,15,11];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.2750648,-9.0548255);
        restList.push(restaurant);
        
        //23
        restaurant = new Restaurant(22, "The Pie Maker", "10 Cross Street Upper", "091-561 917", "Galway", 3, "fast food");
        restaurant.getReviews();
        numbers  = [];
        restaurant.review = this.getReview(numbers);
        opening = [0,0,0,1,1,1,2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.2716435,-9.0562366);
        restList.push(restaurant);
        
        //24
        restaurant = new Restaurant(23, "Rouge Restaurant", "38 Dominick Street", "091-530 681", "Galway", 3, "french restaurant");
        restaurant.getReviews();
        numbers = [12, 1];
        restaurant.review = this.getReview(numbers);
        opening = [11,11,11,12,14,14,11];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(53.2704902,-9.0593697);
        restList.push(restaurant);
        
        //25
        restaurant = new Restaurant(24, "Liberty Grill", "32 Washington St, Centre", "021-427 1049",  "Cork", 4, "pub grub");
        restaurant.getReviews();
        numbers = [1, 2, 4, 7];
        restaurant.review = this.getReview(numbers);
        opening  = [4,4,4,5,5,4,1];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(51.8978427,-8.4803499);
        restList.push(restaurant);
        
        //26
        restaurant = new Restaurant(25, "The Cornstore Restaurant", "40A Cornmarket St", "021-427 1929", "Cork", 4, "seafood");
        restaurant.getReviews();
        numbers = [];
        restaurant.review = this.getReview(numbers);
        opening  = [0,1,2,3,4,5,6];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(51.8990477,-8.4786912);
        restList.push(restaurant);
        
        //27
        restaurant = new Restaurant(26, "Quinlans Seafood Bar", "14 Princes St, Centre", "021-241 8222", "Cork", 4, "seafood");
        restaurant.getReviews();
        numbers = [2, 4, 8];
        restaurant.review = this.getReview(numbers);
        opening = [0,0,0,1,2, 1,9];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(52.08346,-9.4101397);
        restList.push(restaurant);
        
        //28
        restaurant = new Restaurant(27, "Haveli Indian Restaurant", "Morris House, Church St", "021-241 8222", "Douglas", 4, "indian");
        restaurant.getReviews();
        numbers = [1, 4, 7];
        restaurant.review = this.getReview(numbers);
        opening  = [15,5,5,5,5,1,2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(51.8764073,-8.4419733);
        restList.push(restaurant);
        
        //29
        restaurant = new Restaurant(28, "The Olive Tree", "8 The Mall", "051-585 555", "Waterford", 5, "cafe");
        restaurant.getReviews();
        numbers  = [10];
        restaurant.review = this.getReview(numbers);
        opening = [1, 1, 2,3, 4, 2, 1];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(52.77233,-7.2971574);
        restList.push(restaurant);
        
        //30
        restaurant = new Restaurant(29, "Loko Restaurant", "Ardkeen Shopping Centre", "051-841 040", "Dunmore", 5, "steak house");
        restaurant.getReviews();
        numbers = [11];
        restaurant.review = this.getReview(numbers);
        opening = [15, 15, 15, 14, 12, 11, 11]
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(52.2469961,-7.0852777);
        restList.push(restaurant);
        
        //31
        restaurant = new Restaurant(30, "Lagoon Seafood", "20 Queen's St", "051-393 442",  "Tramore", 5, "seafood");
        restaurant.getReviews();
        numbers = [0, 17, 12];
        restaurant.review = this.getReview(numbers);
        opening = [0, 3, 2, 2, 3, 3, 2];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(52.1618227,-7.1530253);
        restList.push(restaurant);
        
        //32
        restaurant = new Restaurant(31, "La Boheme Restaurant", "2 George's Street", "051-875 645", "Waterford", 5, "french");
        restaurant.getReviews();
        numbers  = [];
        restaurant.review = this.getReview(numbers);
        opening = [1,2,3,4,5,6,7];
        restaurant.openingTimes = this.getOpenHours(opening);
        restaurant.setMap(52.2617123,-7.1159647);
        restList.push(restaurant);
      
        
        return restList;
    }
    
    //23 reviews
    private getReview(numbers : number[]) : Review[]
    {
        let reviews : Review[];
        reviews = [];
        
        if(numbers.length <= 0)
        {
            
            return reviews;
        }
        
        let review : Review[] = [
            new Review(2, "Poor, would rather eat out of a bin", "JustEric"),
            new Review(4, "The staff were great when i needed some assistance!", "DamsalInDistress"),
            new Review(2, "Small and cramped tables, no enough ketchup", "Gin"),
            new Review(1, "Where do i begin? The food was cold and took ages to arrive. The staff were rude and did not do much to resolve a situation that arised. Avoid at all costs.", "Unhappy Customer"),
            new Review(3, "Was decent for the money but not recommended.", "Paula Molley"),
            new Review(2, "Poor at best.", "Ramona Jenkins"),
            new Review(1, "Disguisting", "Peter Berry"),
            new Review(3, "It was fine. Not outstanding or poor!", "Andrew Sherlock"),
            new Review(5, "Had a great meal here, the staff were very accomadating. Would eat at again",  "Tony Tiger"),
            new Review(4, "Not a bad meal at all, Would come back to.", "Jenny Adams"),
            new Review(4, "I enjoyed the meal. The staff were friendly and the place was very clean. 5 Stars!!!", "William P"),
            new Review(4, "I am a fan of this restaurant, it is nice to eat and watch the world go by.", "BiscuitLover86"),
            new Review(5, "Great meals at great prices. Highly recommeneded.", "Paul1232213"),
            new Review(5, "One of the best restaurants in ireland", "SeanMolo1"),
            new Review(4, "Good prices for good meals.", "loves2Crit"),
            new Review(5, "I enjoyed the meal very much, its worth the trek!", "As891232"),
            new Review(3, "Its was good but a bit expensive. ", "BulletB1ll"),
            new Review(2, "Food was average and the cost was high!", "NotImpressedUser"),
            new Review(4, "Great food, i loved the meal", "Regina"),
            new Review(3, "It was perfectly wonderfully average", "L"),
            new Review(2, "YUCK....", "sherlock32"),
            new Review(5, "*****, they are the stars i give this resturant", "hippo99"),
            new Review(4, "A knockout deal", "asha_no_joe"),
            new Review(2, "Dont go there if you have an alternative", "gg123"),
        ]
        
        for(let i = 0; i < numbers.length; i++)
        {
            reviews[i] = review[numbers[i]];
        }
        
        return reviews;
    }
    
    private getOpenHours(numbers:number[]) : String[]
    {
        
        
        let openingTimes : String[] = [];
        
        // 16
        let options : String[] = 
            [
                "12:00pm - 8:00pm",
                "12:00pm - 9:00pm",
                "12:00pm - 10:00pm",
                "12:00pm - 11:00pm",
                "12:00pm - 12:00pm",
                "12:00pm - 1:00am",
                "2:00pm - 8:00pm",
                "2:00pm - 9:00pm",
                "2:00pm - 10:00pm",
                "1:30pm - 10:00pm",
                "1:30pm - 9:00pm",
                "3:00pm - 12:00am",
                "5:00pm - 10:00pm",
                "5:00pm - 2:00am",
                "7:00pm - 3:00am",
                "1:00pm - 8:00pm",
                "5:00pm - 8:00pm",        
            ];
        
        
        for(let i = 0; i < numbers.length; i++)
        {
            let s = null;
            
            switch(i)
            {
                case 0 : s = "Monday";
                    break;
                case 1 : s = "Tuesday";
                    break;
                case 2 : s = "Wednesday";
                    break;
                case 3 : s = "Thursday";
                    break;
                case 4 : s = "Friday";
                    break;
                case 5 : s = "Saturday";
                    break;
                case 6 : s = "Sunday";
                    break;
                default :
                    s = null;
            }
            
            openingTimes[i] =  s + " " + options[numbers[i]];
        }
        
        
        return openingTimes;
    }
    
    private getDay(index : number)
    {
       let days : String[] = ["Monday, Tuesday, Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        return days[index];
    }
}
    
//********************************************************************************************//
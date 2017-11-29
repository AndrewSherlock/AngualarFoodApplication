
import {Injectable} from '@angular/core';

import {Review} from '../review/review';
import{ReaderService} from '../reader_service/reader_service';


@Injectable()
export class RestaurantService
{
    private restaurantList : Restaurant[] = [];
    
    constructor()
    {   
        this.getJsonText();
       /* this.restaurantList[0] = new Restaurant(0, "Macari", "Main street", "01-2222", "Dunboyne", 0, "Fast food");
        this.restaurantList[1] = new Restaurant(1, "La Bucca", "Main street", "01-2221", "Ashbourne", 0, "Italian");
        this.restaurantList[2] = new Restaurant(2, "Restaurant on dublin", "Main street", "01-2222", "Dunboyne", 1, "Fast food");
        this.restaurantList[3] = new Restaurant(3, "Restaurant in kildare", "Main street", "01-2222", "Dunboyne", 2, "Fast food"); */
        
      
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
        
        return this.getRestaurantList(); // needs to be changed back to work right
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
            max = 10;
        } else{
            max = this.restaurantList.length;
        }
        
        for(let i = 0; i < max; i++)
        {
            let currentHighest = this.restaurantList[0];
            let element = 0;
            
            for(let p = 1; p < this.restaurantList.length;p++)
            {
                if(temp[p].getAverageReviewScore() > currentHighest.getAverageReviewScore())
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

export class Restaurant
{
    private review : Review[] = [new Review(3, "tis fine", "peter"), new Review(1, "meh", "paul")];
    private openingTimes : String[] = [];
    private score : Number;
    
    private menu : Menu;
    
    constructor(public id : Number, public name : String, public address: String, public phone: String, public town: String, public countyid : number, public cuisineType : String)
    {
        this.score = this.getAverageReviewScore();
        this.menu = new Menu();
        
        this.getOpeningTimesFromFile();
    }
    
    getReviewsFromFile()
    {
        let text;
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/openingTimes'+ this.id+'.json', true);
            
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
        
    
    
    getAverageReviewScore() : Number
    {
        let total : number = 0;
        
        if(this.review.length == 0)
            return 0;
        
        for(let i = 0; i < this.review.length;i++)
        {
            total +=  this.review[i].numOfStars;
        }
        
        return total / this.review.length;
    }
    
    getReviews() : Review[]
    {
        return this.review;
    }
    
    addReview(review : Review)
    {
        this.review[this.review.length] = review;
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
        this.getMenuFromFile();
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
                    self.starters[i] = new Product(text['menu']['main'][i].name, text['menu']['main'][i].price); 
                }
                
                 for(let i = 0; i < text['menu']['deserts'].length; i++)
                {
                    self.starters[i] = new Product(text['menu']['deserts'][i].name, text['menu']['deserts'][i].price); 
                }
                
                 for(let i = 0; i < text['menu']['drinks'].length; i++)
                {
                    self.starters[i] = new Product(text['menu']['drinks'][i].name, text['menu']['drinks'][i].price); 
                }
            };  
        };
        request.send();  
    }
    
    getAveragePrice()
    {
      let sum = 0;
      sum += this.avgArray(this.starters);
      sum += this.avgArray(this.dinners);
      sum += this.avgArray(this.deserts);
      sum += this.avgArray(this.drinks);
        
      this.menuAvg = sum/4;  
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
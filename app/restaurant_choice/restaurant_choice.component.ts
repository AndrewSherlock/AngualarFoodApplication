import{NgModule, Component, OnInit, OnDestroy} from '@angular/core';
import{CommonModule} from '@angular/common';
import{RouterModule} from '@angular/router';
import{ActivatedRoute} from '@angular/router';

import RestaurantDetailComponent from '../restaurant_detail/restaurantdetail.component';
import{RestaurantService, Restaurant} from '../restaurant_service/restaurant_service';

@Component({
    moduleId: module.id,
    selector: 'home_page',
    templateUrl:'./restaurant_choice.component.html',
    styleUrls:['./restaurant_choice.component.css']
})

export default class RestaurantChoiceComponent implements OnInit, OnDestroy
{
    private restaurants : Restaurant[]  = [];
    private countyChoice : String;
    private choiceId : number;
    
    private towns: String[] = [];
    private foodTypes: String[] = [];
    
    subscriberParams : any;
    subscriberData: any;
    
    constructor(private route:ActivatedRoute){}
    
    ngOnInit()
    {
        this.subscriberParams = this.route.params.subscribe(params =>{
            this.choiceId = +params['id'];
            
            this.countyChoice = this.getCountyChoice(this.choiceId);
        })
        
        let restaurant_service = new RestaurantService(); 
        this.restaurants = restaurant_service.getRestaurantByCounty(this.choiceId); 
       
        this.towns = this.getListOfTowns();
        this.getFoodTypes();
        
        for(let x = 0; x < this.foodTypes.length; x++)
        {
            console.log(this.foodTypes[x]);
        }
            
    }
    
    getFoodTypes()
    {
        let types : String[] = [];
        let found: boolean = false;
        
        for(let x = 0; x < this.restaurants.length; x++)
        {
            found = false;
            
            for(let i = 0; i < types.length; i++)
            {
                if(types[i] == this.restaurants[x].cuisineType)
                {
                    found = true;
                    break;
                }
            }
            
            if(!found)
                types[types.length] = this.restaurants[x].cuisineType;
        }
        
        this.foodTypes = types;
    }
    
    filterByTown(town : String)
    {
        this.clear();
        
        if(town.toLowerCase() == "any")
        {
            this.clear();
            return;
        }
        
        let currentRestaurants = this.restaurants;
        let temp : Restaurant[] = [];
            
        for(let i = 0; i < currentRestaurants.length;i++)
        {
            if(currentRestaurants[i].town.toLowerCase() == town.toLowerCase())
            {
                temp[temp.length] = currentRestaurants[i];
            }
            this.restaurants = temp;
        }  
    }
    
    getListOfTowns() : String[]
    {
        let temp : String[] = [];
        let found : boolean = false;
        
        
        for(let i = 0; i < this.restaurants.length; i++)
        {
            found = false;
            
            for(let p = 0; p < temp.length; p++)
            {
                
                if(temp[p].toLowerCase() == this.restaurants[i].town.toLowerCase())
                {
                    found = true;
                    break;
                }
            }
            
            if(!found)
                temp[temp.length] = this.restaurants[i].town;
        }
            
        return temp;
    }
    
    
    filter(townChoice : String, rating: number)
    {
        if(townChoice == undefined && rating == undefined){
            alert("Nothing entered for search");
            return;
        }
        
        this.clear();
        let currentRestaurants = this.restaurants;
        
        if(townChoice != undefined)
        {
            let temp : Restaurant[] = [];
            
            for(let i = 0; i < currentRestaurants.length;i++)
            {
                if(currentRestaurants[i].town.toLowerCase() == townChoice.toLowerCase())
                {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            
            currentRestaurants = temp;
        }  
            
        if(rating != undefined && !isNaN(rating))
        {
            let temp : Restaurant[] = [];
            
            
            
            for(let i = 0; i < currentRestaurants.length;i++)
            { 
                if(currentRestaurants[i].getScore() >= rating)
                {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            
            currentRestaurants = temp;
        }
        
        if(currentRestaurants.length > 0){
            this.restaurants = currentRestaurants;
        } else{
            alert("No restaurants found!");
            this.clear();
        }
    }
    
    filterByFoodType(foodType: String)
    {
        this.clear();
        let currentRestaurants : Restaurant[] = this.restaurants;
        
        console.log(foodType);
        
        if(foodType != undefined)
        {
            let temp : Restaurant[] = [];
        
            for(let i = 0; i < currentRestaurants.length;i++)
            {
                console.log(currentRestaurants[i].cuisineType, foodType);
                if(currentRestaurants[i].cuisineType.toLowerCase() == foodType.toLowerCase())
                {
                    temp[temp.length] = currentRestaurants[i];
                }
            }
            
            currentRestaurants = temp;
        }
        
        this.restaurants = currentRestaurants;
    }
    
    clear()
    {
        
        let restaurant_service = new RestaurantService();
        this.restaurants = restaurant_service.getRestaurantByCounty(this.choiceId);
    }
   
    
    
    getCountyChoice(id : number)
    {
        let countys = ["Meath", "Dublin", "Kildare"];
        return countys[id];
    }
    
    ngOnDestroy()
    {
        if(this.subscriberParams != null)
            this.subscriberParams.unsubscribe();
        if(this.subscriberData !=null)
            this.subscriberData.unsubscribe();   
    }
}
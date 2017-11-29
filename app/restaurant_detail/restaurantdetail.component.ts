import{Component, OnInit, OnDestroy} from '@angular/core';
import{ActivatedRoute} from '@angular/router';

import{RestaurantService, Restaurant} from '../restaurant_service/restaurant_service';

@Component({
    moduleId: module.id,
    selector: 'home_page',
    templateUrl:'./restaurantdetail.component.html',
    styleUrls:['./restaurantdetail.component.css']
})

export default class RestaurantDetailComponent implements OnInit, OnDestroy{
    
    subscriberParams : any;
    subscriberData: any;
    
    private restaurantId : number;
    private restaurant : Restaurant;
    
    constructor(private route: ActivatedRoute){}
    
    ngOnInit()
    {
        this.subscriberParams = this.route.params.subscribe(params =>{
            this.restaurantId = +params['restid'];
        })
        
        let rest_service = new RestaurantService();
        
        this.restaurant = rest_service.getRestaurantById(this.restaurantId);
        console.log(this.restaurant);
    }
    
    ngOnDestroy()
    {
      
        if(this.subscriberParams != null)
            this.subscriberParams.unsubscribe();
        if(this.subscriberData !=null)
            this.subscriberData.unsubscribe();   
    }
    
}
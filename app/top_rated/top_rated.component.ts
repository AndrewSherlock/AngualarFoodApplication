import{Component, Input, OnInit} from '@angular/core';
import{RestaurantService, Restaurant} from '../restaurant_service/restaurant_service';

@Component({
    moduleId: module.id,
    selector: 'top_rated',
    templateUrl: './top_rated.component.html',
    styleUrls:['./top_rated.component.css']
})


export default class TopRatedComponent implements OnInit{
    
    private top_ranked : Restaurant[];
    private ranking : number[];
    
    ngOnInit()
    {
        let rest_service = new RestaurantService();
        this.top_ranked = rest_service.getRestaurantByRanking();
      
    }

}
// Implement ScoreComponent here.
import{Component, Input, OnInit} from '@angular/core';
import{RestaurantService, Restaurant} from '../restaurant_service/restaurant_service';

@Component({
    moduleId: module.id,
    selector: 'review',
    templateUrl: './score.component.html',
})


export default class ScoreComponent implements OnInit{
    
    @Input() restaurant : Restaurant;
    private star: Number;
    
    ngOnInit()
    {
        
      this.star = this.restaurant.getScore();
    }

}
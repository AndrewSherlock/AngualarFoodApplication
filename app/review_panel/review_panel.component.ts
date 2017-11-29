import{Component, Input, OnInit} from '@angular/core';
import{CommonModule} from '@angular/common';
import{Restaurant} from '../restaurant_service/restaurant_service';
import{Review} from '../review/review';

@Component({
    moduleId: module.id,
    selector: 'review_pane',
    templateUrl: './review_panel.component.html',
    styleUrls:['./review_panel.component.css']
    
})


export default class ReviewPanelComponent implements OnInit{
    
    @Input() restaurant : Restaurant;
    
    private reviews : Review[];
    private star: Number;
    
    ngOnInit()
    {
        this.reviews = this.restaurant.getReviews();
    }
    
    addReview(rating : number, comment :String, commenter:String )
    {
        this.restaurant.addReview(new Review(rating, comment, commenter));  
    }

}
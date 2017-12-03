
import{Component, OnInit, Input} from '@angular/core';
import{Restaurant} from '../restaurant_service/restaurant_service';



@Component({
    moduleId: module.id,
    selector: 'map_section',
    templateUrl:'./map.component.html',
    styleUrls:['./map.component.css']
})

export default class MapSection implements OnInit{
    
    @Input() restaurant : Restaurant;
    
    private lat : Number;
    private long : Number;
    
    constructor( ){

    }
    
    ngOnInit()
    {
        this.lat = this.restaurant.lat;
        this.long = this.restaurant.long;
    }
    
    
}


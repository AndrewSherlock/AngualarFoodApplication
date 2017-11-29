import{Component, Input, OnInit} from '@angular/core';
import{Menu} from '../restaurant_service/restaurant_service';

@Component({
    moduleId: module.id,
    selector: 'menu_display',
    templateUrl: './menu_display.component.html',
})


export default class MenuDisplayComponent implements OnInit{
    
    @Input() menu : Menu;
    
    ngOnInit()
    {
        
    }

}
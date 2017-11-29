
import{Component, OnInit} from '@angular/core';
import {County, CountyService} from '../countie_service/county_service';



@Component({
    moduleId: module.id,
    selector: 'list_section',
    templateUrl:'./list.component.html',
    styleUrls:['../county_list/county_list.component.css']
})

export default class ListComponent implements OnInit{
    
    private counties : Array<County> = [];
    
    constructor( ){

    }
    
    ngOnInit()
    {
        let county_service = new CountyService(); 
        this.counties = county_service.getCountieList();
    }
    
    
}


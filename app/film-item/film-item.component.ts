import{Component, Input, OnInit} from '@angular/core';
import {Film, FilmService} from '../film-service/film-service';

@Component({
    moduleId: module.id,
    selector: 'film_section',
    templateUrl: './film-item.component.html',
    styleUrls: ['./film-item.component.css']
})


// Implement FilmItemComponent here.
export default class FilmItemComponent implements OnInit{
    
    @Input() private film : Film;
    public imageUrl : String;
    
    ngOnInit()
    {
        this.imageUrl = "images/" + this.film.id + ".jpg";
    }

}
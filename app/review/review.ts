import{Injectable} from '@angular/core';

export class Review{
    
    constructor( public numOfStars : number,public comment : String, 
    public commenter: String){}
}
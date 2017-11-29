import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/rx";


@Injectable()
export class CountyService
{
   
    private countyList : County[] = [];
    private json : String;
    
    constructor( )
    {

    }
    
    getCountieList() : County[]
    {
        this.getJsonText(); 
        console.log(this);
        return this.countyList;
     }
 
    
    getJsonText()
    {
        let text;
        var self = this;
      
        var request = new XMLHttpRequest();
        request.open('GET', '../../json/counties.json', true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsText(request.response);
      
            reader.onload =  (e) =>{
                text = reader.result;
                text = JSON.parse(text);
            
                for(let i = 0; i < text['countyList']['counties'].length; i++)
                {
                    self.countyList[i] = new County(text['countyList']['counties'][i].name, text['countyList']['counties'][i].id, text['countyList']['counties'][i].img);   
                }
            };
        };
        
        request.send();
    }
    
  
    
}


export class County{
    
    constructor(public countyName : String, public countyId : Number, public imageLink : String){}
    
}

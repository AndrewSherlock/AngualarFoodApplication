import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs/rx';

@Injectable()
export class ReaderService
{
    
    
    constructor(private http: HttpClient){
        
    }
    
    GetAllRestaurants(): Observable<any[]>
    {
        return this.http.get('../../json/restaurants.json').map(
            res=>{
                return res.json();
            }
        )
    }
}
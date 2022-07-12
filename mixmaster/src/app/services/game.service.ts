import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map } from '../models/map';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getMaps(){
    return this.http.get('http://localhost:3000/api/maps', {withCredentials:true});
  }

  getAllUsers(){
    return this.http.get('http://localhost:3000/api/users', {withCredentials:true});
  }

  updateCurrentUser(){
    return this.http.get('http://localhost:3000/api/update', {withCredentials:true});
  }

  getHero(){

  }
  getCores(){
  }
  gold(user:any){
    console.log(user);
    return this.http.post('http://localhost:3000/api/gold', user, {withCredentials:true});
  }


  getMixFormulas(){

  }

}

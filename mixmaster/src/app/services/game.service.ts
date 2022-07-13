import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  private backend_url="http://localhost:3000/api";


  getAllUsers(){
    return this.http.get(this.backend_url + '/users', {withCredentials:true});
  }

  updateCurrentUser(){
    return this.http.get(this.backend_url + '/update', {withCredentials:true});
  }

  mine(user:any){
    return this.http.post(this.backend_url + '/mine', user, {withCredentials:true});
  }

  upgrade(tier:any){
    return this.http.post(this.backend_url + '/upgrade', tier, {withCredentials:true});
  }

  reset(user:any){
    return this.http.post(this.backend_url + '/reset', user, {withCredentials:true});
  }

  getMixFormulas(){

  }

}

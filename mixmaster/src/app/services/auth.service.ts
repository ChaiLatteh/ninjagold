import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private backend_url="http://localhost:3000/api";

  getUsers(){
    return this.http.get(this.backend_url + '/users', {withCredentials:true});
  }

  register(data: any){
    return this.http.post(this.backend_url + '/user', data, {withCredentials:true});
  }

  login(user: User){
    return this.http.post(this.backend_url + '/login', user, {withCredentials:true});
  }

  getCurrentUser(){
    return this.http.get(this.backend_url + '/current', {withCredentials:true});
  }

  logout(){
    return this.http.get(this.backend_url + '/logout', {withCredentials:true});
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:3000/api/users', {withCredentials:true});
  }

  register(data: any){
    return this.http.post('http://localhost:3000/api/user', data, {withCredentials:true});
  }

  login(user: User){
    return this.http.post('http://localhost:3000/api/login', user, {withCredentials:true});
  }

  getCurrentUser(){
    return this.http.get('http://localhost:3000/api/current', {withCredentials:true});
  }

  logout(){
    return this.http.get('http://localhost:3000/api/logout', {withCredentials:true});
  }


}

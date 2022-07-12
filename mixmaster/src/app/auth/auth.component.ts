import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  users: any = [];
  user:any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.getCurrentUser();
  }
  getUsers(){
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
  getCurrentUser(){
    this.authService.getCurrentUser().subscribe(user => {
      if(user){
        this.user = user;
      }
      else{
        this.router.navigate(['/'])
      }
    });
  }
}

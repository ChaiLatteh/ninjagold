import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any = [];
  user: any;
  username:string;
  password:string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login(formData:any){
    this.authService.login(formData.value).subscribe((data) => {
      if(data=="Username not found."){
        alert("Username not found.");
      }
      else if(data=="Username or Password does not match."){
        alert("Username or Password does not match.");
      }
      else if(typeof data=="object"){
        this.user = data;
        this.router.navigate(['/game']);
      }
      else if(data=="Something went wrong."){
        alert("Something went wrong.");
      }
    });
  }

  getCurrentUser(){
    this.authService.getCurrentUser().subscribe((data)=>{
      console.log(data);
      if(typeof data=="object"){
        this.router.navigate(['/game']);
      }
    })
  }

}

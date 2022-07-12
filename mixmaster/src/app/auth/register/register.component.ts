import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string;
  users: any = [];
  user: any;
  username:string;
  password:string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  register(formData:any){
    this.authService.register(formData.value).subscribe((data)=>{
      if(typeof data=="string"){
        alert("Username already exists.");
      }
      else if(typeof data=="object"){
        alert("Successfully registered!");
      }
    });
    formData.reset();
  }
}

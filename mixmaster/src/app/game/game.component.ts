import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  user: any;
  users: any = [];

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }


  getCurrentUser(){
    this.authService.getCurrentUser().subscribe(data=>{
      if(typeof data=="object"){
        this.user = data;
        console.log(this.user);
      }
      else{
        this.router.navigate(['/']);
        setTimeout(function(){
          alert("Please log in.");
        });
      }
    })
  }
  updateCurrentUser(){
    this.gameService.updateCurrentUser().subscribe(data=>{
      if(typeof data=="object"){
        this.user = data;
        console.log(this.user);
      }
    })
  }

  logout(){
    this.authService.logout().subscribe(data => {
      if(data){
        console.log("couldn't log out " + data);
      }
      else{
        console.log(data);
        this.router.navigate(['/'])
      }
    })

  }

}

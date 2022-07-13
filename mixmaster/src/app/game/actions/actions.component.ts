import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  test:any;
  user:any;
  constructor(
    private gameService: GameService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data)=>{
      if(typeof data=="object"){
        this.user = data;
      }
    })


  }

  mine(user=this.user){
    this.gameService.mine(user).subscribe((data)=>{
      if(typeof data=="object"){
        this.user = data;
      }
    })
  }
  updateCurrentUser(){
    this.gameService.updateCurrentUser().subscribe(data=>{
      if(typeof data=="object"){
        this.user = data;
      }
    })
  }
  upgrade(tier:string){
    this.gameService.upgrade(tier).subscribe(data=>{
      if(typeof data=="object"){
        this.user = data;
      }
      else{
        alert(data);
      }
    })
  }
  reset(user=this.user){
    this.gameService.reset(user).subscribe((data)=>{
      if(typeof data=="object"){
        this.user = data;
      }
    })
  }

  playSound(){
    if (this.user.clicks%3==0){
      this.ninjaSound();
    }
    else if (this.user.clicks%3==1){
      this.pickSound();
    }
  }

  ninjaSound(){
    let ninjasound = new Audio();
    ninjasound.src="/assets/ninjasound.wav";
    ninjasound.load();
    ninjasound.play();
  }
  pickSound(){
    let picksound = new Audio();
    picksound.src="/assets/picksound.wav";
    picksound.load();
    picksound.play();
  }


}

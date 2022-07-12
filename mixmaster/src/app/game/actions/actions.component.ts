import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  map_list: any;
  test:any;
  user:any;
  timer:any;
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

  hunt(){
    this.gameService.getMaps().subscribe((data)=>{
      if(typeof data=="object"){
        this.map_list = data;
      }
    })
  }
  startHunt(user:any){
    this.gameService.gold(user).subscribe((data)=>{
      this.user = data;
    });
  }
  updateCurrentUser(){
    this.gameService.updateCurrentUser().subscribe(data=>{
      if(typeof data=="object"){
        this.user = data;
      }
    })
  }


  back(){
    location.reload();
  }

}

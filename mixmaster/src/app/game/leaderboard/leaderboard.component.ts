import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users: any;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();

    setInterval(()=>{
      this.getAllUsers();
    },1000)
  }

  getAllUsers(){
    this.gameService.getAllUsers().subscribe(data=>{
      this.users = data;
    })
  }


}

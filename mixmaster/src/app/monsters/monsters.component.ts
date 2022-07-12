import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../services/monster.service';
import { Monster } from '../models/monster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  monsters: any = [];
  monster: any;

  constructor(
    private monsterService: MonsterService,
    private router: Router,
  ) { }



  ngOnInit(): void {}

  getMonsters(){
    this.monsterService.getMonsters().subscribe(monsters => {
      this.monsters = monsters;
    })
  }


  addMonster(formData:any){
    this.monsterService.addMonster(formData.value).subscribe(monster => {
      this.monster = monster;
    });
    // formData.reset();
  }

  deleteMonster(id:any){
    this.monsterService.deleteMonster(id)
    .subscribe();
    console.log("Deleted the monster");
    // .subscribe(monster => {
    //   // this.router.navigateByUrl('/api/monsters')
    //   console.log("Successfully deleted");
    // })
  }

  deleteAllMonsters(){
    this.monsterService.deleteAllMonsters()
    .subscribe();
    console.log("Deleted all monsters");
  }

}

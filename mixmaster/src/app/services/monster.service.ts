import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monster } from '../models/monster';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }

  getMonsters(){
    return this.http.get('http://localhost:3000/api/monsters');
  }

  addMonster(monster: Monster){
    return this.http.post('http://localhost:3000/api/monster', monster);
  }
  deleteMonster(id:string){
    return this.http.delete('http://localhost:3000/api/monster/' + id)
  }

  deleteAllMonsters(){
    return this.http.delete('http://localhost:3000/api/monster')
  }

}

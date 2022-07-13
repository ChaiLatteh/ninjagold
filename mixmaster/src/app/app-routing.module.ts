import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { GameComponent } from './game/game.component';
import { ActionsComponent } from './game/actions/actions.component';
import { NewsComponent } from './game/news/news.component';


const routes: Routes = [
  {path:'', component: AuthComponent},
  {path:'game', component: GameComponent},
  // {path:'', redirectTo:'login', pathMatch: 'full'},
  // {path:'register', component: RegisterComponent},
  // {path:'users', component:UsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

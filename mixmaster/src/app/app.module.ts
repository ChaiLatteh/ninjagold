import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { GameComponent } from './game/game.component';
import { ActionsComponent } from './game/actions/actions.component';
import { NewsComponent } from './game/news/news.component';
import { LeaderboardComponent } from './game/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    GameComponent,
    ActionsComponent,
    NewsComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

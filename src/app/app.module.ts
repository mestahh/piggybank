import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {UsersService} from './users/users.service';
import { RegisterComponent } from './users/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { ConfirmComponent } from './users/confirm/confirm.component';
import { MessagingComponent } from './messaging/messaging.component';
import {MessagingService} from './messaging/messaging.service';
import { LoginComponent } from './users/login/login.component';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'confirm', component: ConfirmComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ConfirmComponent,
    MessagingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService, MessagingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

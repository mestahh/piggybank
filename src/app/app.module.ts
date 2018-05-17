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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'confirm', component: ConfirmComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ConfirmComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [UsersService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

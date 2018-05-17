import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../users.service';
import {MessagingService} from '../../messaging/messaging.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private messagingService: MessagingService, private router: Router) { }

  ngOnInit() {
  this.authService.loggedIn.subscribe((authenticated: boolean) => {
      this.messagingService.success('Login successful.');
      this.router.navigate(['/home']);
    }, (err) => {
      this.messagingService.error(err);
    });
  }

  submit(f: NgForm) {
    this.authService.login(f.value.username, f.value.password);
  }

}

import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {Form, NgForm} from '@angular/forms';
import {MessagingService} from '../../messaging/messaging.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private authService: AuthService, private messagingService: MessagingService) { }

  ngOnInit() {
  }

  submit(f: NgForm) {
    this.authService.register(f.value.username, f.value.email, f.value.password).subscribe(() => {
      this.messagingService.success('Registration successful.');
      f.reset();
    }, (err) => {
      this.messagingService.error(err);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../users.service';
import {MessagingService} from '../../messaging/messaging.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private authService: AuthService, private messagingService: MessagingService) {
  }

  ngOnInit() {
  }

  submit(f: NgForm) {
    this.authService.confirm(f.value.username, f.value.confirmation).subscribe(() => {
      this.messagingService.success('Confirmation successful.');
      f.reset();
    }, (err) => {
      this.messagingService.error(err);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../users.service';
import {MessagingService} from '../../messaging/messaging.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private usersService: UsersService, private messagingService: MessagingService) {
  }

  ngOnInit() {
  }

  submit(f: NgForm) {
    this.usersService.confirm(f.value.username, f.value.confirmation).subscribe(() => {
      this.messagingService.success('Confirmation successful.');
      f.reset();
    }, (err) => {
      this.messagingService.error(err);
    });
  }

}

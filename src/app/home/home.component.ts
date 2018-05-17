import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users/users.service';
import {User} from '../users/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  user: User;
  removeDisabled = false;

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.users = this.usersService.getUsers();
    this.user = this.users[0];
  }

  save() {
    this.usersService.save(this.user);
  }

  add() {
    this.user.money = this.user.money + 50;
    if (this.user.money > 0) {
      this.removeDisabled = false;
    }
  }

  remove() {
    this.user.money = this.user.money - 50;
    if (this.user.money === 0) {
      this.removeDisabled = true;
    }
  }

}

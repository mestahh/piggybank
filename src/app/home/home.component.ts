import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users/users.service';
import {User} from '../users/user.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  user: User;
  removeDisabled = false;

  constructor(private usersService: UsersService, private authService: AuthService) {

  }

  ngOnInit() {
    const authenticatedUser = this.authService.getAuthenticatedUser();
    this.usersService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        for (const u of users) {
          if (authenticatedUser.getUsername() === u.username) {
            this.user = u;
          }
        }
      }
    );
  }

  save() {
    this.usersService.save(this.user);
  }

  add() {
    this.user.balance = this.user.balance + 50;
    if (this.user.balance > 0) {
      this.removeDisabled = false;
    }
  }

  remove() {
    this.user.balance = this.user.balance - 50;
    if (this.user.balance === 0) {
      this.removeDisabled = true;
    }
  }

}

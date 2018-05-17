import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authenticated = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      (auth: boolean) => {
        if (auth) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      },
      (err) => {
        console.log(err);
        this.authenticated = false;
      });
  }

  logout() {
    this.authService.logout();
  }
}

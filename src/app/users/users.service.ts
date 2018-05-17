import {Injectable} from '@angular/core';
import {User} from './user.model';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers() {
    return this.http.get('https://18hoa29loi.execute-api.eu-west-1.amazonaws.com/dev/balances');
  }

  save(user: User) {
    console.log('saving ' + JSON.stringify(user));
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      this.http.post('https://18hoa29loi.execute-api.eu-west-1.amazonaws.com/dev/balances/', user, {
        headers: new HttpHeaders({'Authorization': session.getIdToken().getJwtToken()})
      }).subscribe(
        () => { console.log('updated'); },
        (error) => {
          console.log(error);
        });
    });
  }

}

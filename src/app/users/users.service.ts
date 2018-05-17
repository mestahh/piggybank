import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class UsersService {

  users: User[] = [{money: 150, name: 'Mesti'}, {money: 200, name: 'Imi'}];


  constructor() {
  }

  getUsers(): User[] {
    return this.users;
  }

  save(user: User) {
    console.log('saving ' + JSON.stringify(user));
  }

}

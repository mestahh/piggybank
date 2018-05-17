import { Injectable } from '@angular/core';
import {User} from './user.model';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class UsersService {

  users: User[] = [{money: 150, name: 'Mesti'}, { money: 200, name: 'Imi'}];
  poolData = {
    UserPoolId: 'eu-west-1_fwfhjcjmr',
    ClientId: '3sn0kg2a55e4c4d7bh22m033s2'
  };

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  save(user: User) {
    console.log('saving ' + JSON.stringify(user));
  }

  register(username: string, email: string, password: string) {
    console.log('registering ' + email + ' with ' + password);
    const obs = Observable.create(observer => {
      const userPool = new CognitoUserPool(this.poolData);
      const attributeList = [];

      const dataEmail = {
        Name : 'email',
        Value : email
      };
      const attributeEmail = new CognitoUserAttribute(dataEmail);
      attributeList.push(attributeEmail);
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next();
        }
      });
    });
    return obs;
  }

  confirm(username: string, confirmation: string): Observable<boolean> {
    console.log('confirmation of ' + username);
    const obs = Observable.create(observer => {
      const userPool = new CognitoUserPool(this.poolData);

      const userData = {
        Username : username,
        Pool : userPool
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(confirmation, true, (err, result) => {
        if (err) {
          observer.error(err.message);
        } else {
          observer.next();
        }
      });
    });
    return obs;
  }
}

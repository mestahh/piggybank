import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  loggedIn: Subject<boolean> = new Subject<boolean>();

  poolData = {
    UserPoolId: 'eu-west-1_fwfhjcjmr',
    ClientId: '3sn0kg2a55e4c4d7bh22m033s2'
  };

  constructor() {
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log('registering ' + email + ' with ' + password);
    const obs = Observable.create(observer => {
      const userPool = new CognitoUserPool(this.poolData);
      const attributeList = [];

      const dataEmail = {
        Name: 'email',
        Value: email
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

  confirm(username: string, confirmation: string): Observable<any> {
    console.log('confirmation of ' + username);
    const obs = Observable.create(observer => {
      const userPool = new CognitoUserPool(this.poolData);

      const userData = {
        Username: username,
        Pool: userPool
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

  login(username: string, password: string) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userPool = new CognitoUserPool(this.poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        console.log('Logged in successfully.');
        this.loggedIn.next(true);
      },
      onFailure: (err) => {
        this.loggedIn.error(err.message);
      }
    });
  }

  isAuthenticated() {
    const user = this.getAuthenticatedUser();

    if (!user) {
      this.loggedIn.error('There is no user like this!');
    } else {
      user.getSession((err, session) => {
        if (err) {
          this.loggedIn.error(err.message);
        } else {
          if (session.isValid()) {
            this.loggedIn.next(true);
          } else {
            this.loggedIn.error('Sorry, your session expired. Log in again.');
          }
        }
      });
    }
  }

  getAuthenticatedUser(): CognitoUser {
    const userPool = new CognitoUserPool(this.poolData);
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.loggedIn.next(false);
  }

}

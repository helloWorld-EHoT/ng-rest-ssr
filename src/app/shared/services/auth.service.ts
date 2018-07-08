import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';

import {IUser} from '../models/user.model';
import {ApiService} from './api.service';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  // redirectTo: string;
  user: IUser;

  constructor(private api: ApiService) {

  }

  login(user: IUser): any {
    this.api.getUserToLogin(user.login, user.password).subscribe((response: IUser) => {
      this.user = response;

      this.isLoggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  getAll() {
    return this.api.getUsers();
  }

}

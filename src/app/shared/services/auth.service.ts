import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';

import {IUser} from '../models/user.model';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private isLoggedIn = false;
  private user: IUser;

  constructor(private api: ApiService,
              private router: Router) {}

  login(user: IUser): any {
    this.api.getUserToEmail(user.email, user.password).subscribe((response: IUser) => {
      this.setUser(response);
      this.setLoggedState(true);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getAll() {
    return this.api.getUsers();
  }

  getUser(): IUser {
    return this.user;
  }

  getLoggedState(): boolean {
    return this.isLoggedIn;
  }

  setUser(user: IUser) {
    this.user = user;
    // this.router.navigate(['/chat']);
  }

  setLoggedState(state: boolean) {
    this.isLoggedIn = state;
  }

}

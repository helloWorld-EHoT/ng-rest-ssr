import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {IUser} from '../models/user.model';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private isLoggedIn = false;
  private user: IUser;

  constructor(private api: ApiService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId
  ) {}

  login(user: IUser): Observable<any> {
    return this.api.getUserByEmailAndPassword(user.email.toLowerCase(), user.password);
  }

  logOut() {
    this.isLoggedIn = false;
    this.user = null;
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem('user');
    }
    this.router.navigate(['/auth', 'login']);
  }

  getAll() {
    return this.api.getUsers();
  }

  getUser(): IUser {
    if (isPlatformBrowser(this.platformId) && window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.isLoggedIn = true;
    }
    return this.user;
  }

  getLoggedState(): boolean {
    return this.isLoggedIn;
  }

  setUser(user: IUser) {
    this.user = user;

    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
  }

  setLoggedState(state: boolean) {
    this.isLoggedIn = state;
  }

  getUserById(id: string) {
    return this.api.getUserById(id);
  }

}

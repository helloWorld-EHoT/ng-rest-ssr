import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {IUser} from '../models/user.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatService {

  private isLoggedIn = false;
  private user: IUser;

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId
  ) {}

  // login(user: IUser): any {
  //   this.api.getUserToEmail(user.email, user.password).subscribe((response: IUser) => {
  //     this.setUser(response);
  //     this.setLoggedState(true);
  //
  //     // Navigate
  //     this.router.navigate(['/chat']);
  //     console.log(response);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // logOut() {
  //   this.isLoggedIn = false;
  //   this.user = null;
  //   if (isPlatformBrowser(this.platformId)) {
  //     window.localStorage.removeItem('user');
  //   }
  //   this.router.navigate(['/auth', 'login']);
  // }

  getAll() {
    return this.http.get('http://localhost:3000/chat/');
  }

  removeMessages(id: string) {
    return this.http.delete(`http://localhost:3000/chat/${id}/`);
  }

  // sendMessage(message) {
  //   return this.http.post('http://localhost:3000/chat/', message);
  // }

  // getUser(): IUser {
  //   if (isPlatformBrowser(this.platformId) && window.localStorage.getItem('user')) {
  //     this.user = JSON.parse(window.localStorage.getItem('user'));
  //     this.isLoggedIn = true;
  //   }
  //   return this.user;
  // }
  //
  // getLoggedState(): boolean {
  //   return this.isLoggedIn;
  // }
  //
  // setUser(user: IUser) {
  //   this.user = user;
  //
  //   if (isPlatformBrowser(this.platformId)) {
  //     window.localStorage.setItem('user', JSON.stringify(user));
  //   }
  // }
  //
  // setLoggedState(state: boolean) {
  //   this.isLoggedIn = state;
  // }

}

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

  getAll() {
    return this.http.get('http://localhost:3000/chat/');
  }

  removeMessages(id: string) {
    return this.http.delete(`http://localhost:3000/chat/${id}/`);
  }

}

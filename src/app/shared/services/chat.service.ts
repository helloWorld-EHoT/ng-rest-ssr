import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

import {IUser} from '../models/user.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IMessage} from '../models/message.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatService {

  private isLoggedIn = false;
  private user: IUser;

  messagesStream$: Observable<IMessage[]>;
  private messageSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId,
              @Inject('BASE_URL') private baseUrl: string
  ) {
    this.messagesStream$ = this.messageSubject.asObservable();
  }

  getAll() {
    return this.http.get(`${this.baseUrl}socket/chat/`);
  }

  removeMessages(id: string) {
    return this.http.delete(`${this.baseUrl}socket/chat/${id}/`);
  }

  updateMessages(messages: IMessage[]) {
    this.messageSubject.next(messages);
  }

}

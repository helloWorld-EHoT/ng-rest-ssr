import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Message} from '_debugger';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {IMessage} from '../../shared/models/message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'benamix-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss', '../rooms.general.scss']
})
export class PrivateComponent implements OnInit, OnDestroy {

  private socket$: WebSocketSubject<string>;
  serverMessages: IMessage[] = [];
  sendForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder) {
    this.socket$ = WebSocketSubject.create('ws://localhost:8999');
    this.socket$.subscribe(
      (message) => {
        console.log(message);
        this.serverMessages.push(typeof message === 'string' ? JSON.parse(message) : message);
        console.log(this.serverMessages);
        // this.scroll();
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.warn('Completed!');
      }
    );
  }

  ngOnInit() {
    this.sendForm = this.fb.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.socket$.unsubscribe();
  }

  OnSubmit() {
    const message: IMessage = {
      sender: 'Test',
      content: this.message.toString(),
      date: Date.now().toString()
    };
    this.socket$.next(JSON.stringify(message));
    this.message = '';
  }

}

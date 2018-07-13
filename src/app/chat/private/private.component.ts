import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {IMessage} from '../../shared/models/message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../shared/models/user.model';
import {AuthService} from '../../shared/services/auth.service';
import {PrettyPrintPipe} from '../../shared/pipes/pretty-print.pipe';
import {ChatService} from '../../shared/services/chat.service';

@Component({
    selector: 'benamix-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.scss', '../rooms.general.scss'],
    providers: [PrettyPrintPipe]
})
export class PrivateComponent implements OnInit, OnDestroy {

    private socket$: WebSocketSubject<string>;
    serverMessages: IMessage[] = [];
    sendForm: FormGroup;
    message = '';
    currentUser: IUser;

    chatId = 'our';

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 10 && event.ctrlKey) {
            if (this.sendForm.valid) {
                this.onSubmit();
            }
        }
    }

    constructor(private fb: FormBuilder,
                private auth: AuthService,
                private chat: ChatService) {
        this.socket$ = WebSocketSubject.create('ws://localhost:8999');
        this.socket$.subscribe(
            (message) => {
                const msg: IMessage = typeof message === 'string' ? JSON.parse(message) : message;
                console.log(msg);
                if (msg.type && msg.type === 'MESSAGE_ID_TO_DELETE') {
                    this.serverMessages.forEach((messTD, index, array) => {
                        if (messTD._id === msg.id) {
                            this.serverMessages.splice(index, 1);
                        }
                    });
                } else {
                    if (msg.sender_id === '666') {
                        this.serverMessages.push(msg);
                        setTimeout(() => {
                            this.serverMessages.forEach((serverMessage, i, array) => {
                                if (serverMessage.sender_id === '666') {
                                    array.splice(i, 1);
                                }
                            });
                        }, 6666);
                    } else {
                        this.serverMessages.push(msg);
                    }
                }
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
        this.currentUser = this.auth.getUser();
        this.sendForm = this.fb.group({
            message: ['', [Validators.required]]
        });

        this.chat.getAll().subscribe((chatMessages: IMessage[]) => {
            this.serverMessages = chatMessages;
        }, error => {
            console.log(error);
        });
    }

    ngOnDestroy() {
        const status = {
            content: 'USER_DISCONNECTED',
            sender_id: this.currentUser._id,
            sender: this.currentUser.name,
            date: Date.now().toString(),
            chat_id: this.chatId,
            read: false
        };
        this.socket$.next(JSON.stringify(status));
        console.log(status);
        this.socket$.unsubscribe();
    }

    onSubmit() {
        const message: IMessage = {
            content: this.message,
            sender: this.currentUser.name,
            sender_id: this.currentUser._id,
            date: Date.now().toString(),
            chat_id: this.chatId,
            read: false
        };
        console.log(message);
        // this.chat.sendMessage(message).subscribe((chatMessages) => {
        //     console.log(chatMessages);
        // }, error => {
        //     console.log(error);
        // });
        this.socket$.next(JSON.stringify(message));
        this.message = '';
    }

    removeMessage(id: string) {
        this.chat.removeMessages(id).subscribe(
            response => {
                console.log(response);
            }, error => {
                console.log(error);
            }
        );
    }

}

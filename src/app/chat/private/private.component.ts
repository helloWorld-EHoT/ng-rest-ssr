import {Component, HostListener, Inject, OnDestroy, OnInit, Output} from '@angular/core';
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
    messageTextField = '';
    currentUser: IUser;

    instruction = {
        bold: '*B*',
        italic: '~I~',
        underlined: 'U',
        header: '^H3^',
        sub: '``sub``',
        sup: ',,sup,,',
        strike: '--S--'
    };

    emojiSet: string[] = [
        'angel',
        'angry-1',
        'angry',
        'arrogant',
        'bored',
        'confused',
        'cool-1',
        'cool',
        'crying-1',
        'crying-2',
        'crying',
        'cute',
        'embarrassed',
        'greed',
        'happy-1',
        'happy-2',
        'happy-3',
        'happy-4',
        'happy-5',
        'happy-6',
        'happy-7',
        'happy',
        'in-love',
        'kiss-1',
        'kiss',
        'laughing-1',
        'laughing-2',
        'laughing',
        'muted',
        'nerd',
        'sad-1',
        'sad-2',
        'sad',
        'scare',
        'serious',
        'shocked',
        'sick',
        'sleepy',
        'smart',
        'surprised-1',
        'surprised-2',
        'surprised-3',
        'surprised-4',
        'surprised',
        'suspicious',
        'tongue',
        'vain',
        'wink-1',
        'wink'
    ];

    placement: { start: number, end: number, selection: string } = {
        start: null,
        end: null,
        selection: ''
    };

    @Output() onlineUsers: IUser[] = [];

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
                    if (msg.sender_id === '666' && msg.content === 'ONLINE_USERS') {
                        if (msg.chat_id instanceof Array && msg.chat_id.length) {

                            this.onlineUsers = msg.chat_id;

                          console.log(this.onlineUsers);
                        }
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

        const status = {
            content: 'USER_CONNECTED',
            sender_id: this.currentUser._id,
            sender: this.currentUser.name,
            date: Date.now().toString(),
            chat_id: this.chatId,
            read: false
        };

        this.socket$.next(JSON.stringify(status));

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
        this.socket$.unsubscribe();
    }

    onSubmit() {
        const message: IMessage = {
            content: this.messageTextField,
            sender: this.currentUser.name,
            sender_id: this.currentUser._id,
            date: Date.now().toString(),
            chat_id: this.chatId,
            read: false
        };
        this.socket$.next(JSON.stringify(message));
        this.messageTextField = '';
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

    ifUserOnline(sender_id: string) {
        console.log('this.onlineUsers', this.onlineUsers, sender_id);
        if (this.onlineUsers && !this.onlineUsers.length) {
            return false;
        } else {
            this.onlineUsers.forEach((user) => {
                return user._id === sender_id;
            });
        }
    }

    selectionChange(event) {
        if (event.target.selectionStart >= 0 && event.target.selectionEnd) {
            const selection = event.target.value.substr(event.target.selectionStart, event.target.selectionEnd - event.target.selectionStart);

            console.log('event.target.selectionStart: ', event.target.selectionStart);
            console.log('event.target.selectionEnd: ', event.target.selectionEnd);
            console.log('event.target.value: ', event.target.value);
            this.placement = {
                start: event.target.selectionStart,
                end: event.target.selectionEnd,
                selection: selection
            };
        } else {
            console.log(event.target);
            this.placement = {
                start: null,
                end: null,
                selection: ''
            };
        }

    }

    replaceExtension(modifier: string) {
        if (this.placement.selection.length > 0) {
            const arr = [
                this.messageTextField.slice(0, this.placement.start),
                `${modifier}${this.placement.selection}${modifier}`,
                this.messageTextField.slice(this.placement.end)].join('');
            this.messageTextField = arr;
        }
    }

    quoteMessage(message: IMessage) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const fD = new Date(parseInt(message.date, 10));
        const date = `${fD.getDate()} ${months[fD.getMonth()]} ${fD.getFullYear()} ${fD.getHours()}:${fD.getMinutes()}:${fD.getSeconds()}`;
        const quote = ` "quote-start" ~&laquo;${message.sender}&raquo;~ \`\`${date}\`\`
        ${message.content} "quote-end" \n`;
            this.messageTextField = this.messageTextField + quote;
    }

    onMessageSelect(event, message) {
        console.log(event);
        console.log(message);
    }

    clearField() {
        this.messageTextField = '';
    }

    insertEmoToTextArea(emo: string) {
        if (!this.messageTextField.length) {
            this.messageTextField = `::${emo}::`;

        }else if (!this.placement.start && !this.placement.end) {
            this.messageTextField += ` ::${emo}:: `;
        } else if (this.placement.start === this.placement.end) {
            this.messageTextField = this.insetInside(emo);
        }
    }

    insetInside(emo) {
        return [this.messageTextField.slice(0, this.placement.start), ` ::${emo}:: `, this.messageTextField.slice(this.placement.end)].join('');
    }

}

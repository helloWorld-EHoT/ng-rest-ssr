import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
// import {Message} from '_debugger';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {IMessage} from '../../shared/models/message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../shared/models/user.model';
import {AuthService} from '../../shared/services/auth.service';
import {PrettyPrintPipe} from '../../shared/pipes/pretty-print.pipe';


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

    nodeList: any;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 10 && event.ctrlKey) {
            if (this.sendForm.valid) {
                this.onSubmit();
            }
        } else if (event.keyCode === 10) {
            this.autoSizeTexAreas();
        }
        console.log(event.keyCode === 8);
    }

    constructor(private fb: FormBuilder,
                private auth: AuthService) {
        this.socket$ = WebSocketSubject.create('ws://localhost:8999');
        this.socket$.subscribe(
            (message) => {

                this.serverMessages.push(typeof message === 'string' ? JSON.parse(message) : message);
                console.log(this.serverMessages);
                console.log(this.serverMessages[1] ? this.serverMessages[1].content.toString() : '');
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
        this.currentUser = this.auth.getUser();
        this.sendForm = this.fb.group({
            message: ['', [Validators.required]]
        });
        this.autoSizeTexAreas();
    }

    autoSizeTexAreas() {
        console.log('textareas is resized');
        // this.nodeList = autosize(document.querySelectorAll('textarea'));
    }

    ngOnDestroy() {
        this.socket$.unsubscribe();
    }

    onSubmit() {
        const oldStr = JSON.stringify(this.message).toString();
        const str = oldStr.replace(/\n+/g, '<br/>');

        console.log('str: ', str);

        const message: IMessage = {
            sender: this.currentUser.name,
            content: this.message.toString(),
            date: Date.now().toString()
        };
        this.socket$.next(JSON.stringify(message));
        this.message = '';
    }

}

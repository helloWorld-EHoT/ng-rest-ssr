import {
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {IMessage} from '../../shared/models/message.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../shared/models/user.model';
import {PrettyPrintPipe} from '../../shared/pipes/pretty-print.pipe';
import {ChatService} from '../../shared/services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {ChatMessagePipe} from '../../shared/pipes/chat-message.pipe';

@Component({
    selector: 'benamix-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.scss', '../rooms.general.scss'],
    providers: [PrettyPrintPipe, ChatMessagePipe]
})
export class PrivateComponent implements OnInit, OnDestroy, AfterViewChecked {

    sendForm: FormGroup;
    messageTextField = '';
    @Input() serverMessages: IMessage[] = [];
    @Input() currentUser: IUser;
    @Input() roomId: string;

    privateChat: boolean;

    @ViewChild('messageBody') private messageScrollContainer: ElementRef;

    @Output() messageSubmit: EventEmitter<any> = new EventEmitter();

    selectedEmo = 'happy-7';

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

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (!event.ctrlKey) {
                if (!event.shiftKey) {
                    if (this.sendForm.valid) {
                        this.onSubmit();
                    }
                }
            }
        } else if (event.keyCode === 66 && event.ctrlKey) {
            this.replaceExtension('*');
        } else if (event.keyCode === 73 && event.ctrlKey) {
            this.replaceExtension('~');
        } else if (event.keyCode === 85 && event.ctrlKey) {
            this.replaceExtension('_');
        }
    }

    constructor(private fb: FormBuilder,
                private chat: ChatService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sendForm = this.fb.group({
            message: ['', [Validators.required]]
        });

        this.route.queryParams
            .subscribe(
                param => {
                    if (param.room) {
                        this.privateChat = false;
                        this.roomId = param.room;
                    } else if (param.private) {
                        this.privateChat = true;
                        this.roomId = param.private;
                    }
                }
            );
    }

    ngOnDestroy() {
    }

    onSubmit() {
        const message: IMessage = {
            content: this.messageTextField,
            sender: this.currentUser.name,
            sender_id: this.currentUser._id,
            date: Date.now().toString(),
            chat_id: this.roomId,
            read: false
        };
        this.messageSubmit.emit(JSON.stringify(message));
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

    selectionChange(event) {
        if (event.target.selectionStart >= 0 && event.target.selectionEnd) {
            const selection = event.target.value.substr(event.target.selectionStart, event.target.selectionEnd - event.target.selectionStart);

            this.placement = {
                start: event.target.selectionStart,
                end: event.target.selectionEnd,
                selection: selection
            };
        } else {
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

    clearField() {
        this.messageTextField = '';
    }

    insertEmoToTextArea(emo: string) {
        if (!this.messageTextField.trim().length) {
            this.messageTextField = `::${emo}::`;

        } else if (!this.placement.start && !this.placement.end) {
            this.messageTextField += ` ::${emo}:: `;
        } else if (this.placement.start === this.placement.end) {
            this.messageTextField = this.insetInside(emo);
        }
    }

    insetInside(emo) {
        return [this.messageTextField.slice(0, this.placement.start), ` ::${emo}:: `, this.messageTextField.slice(this.placement.end)].join('');
    }

    selectEmo(emo: string) {
        this.selectedEmo = emo;
    }

    scrollToBottom() {
        try {
            this.messageScrollContainer.nativeElement.scrollTop = this.messageScrollContainer.nativeElement.scrollHeight;
        } catch(err) {
            console.log(err);
        }
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }
}

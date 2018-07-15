import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'benamix-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // @ViewChild(PrivateComponent) room;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}

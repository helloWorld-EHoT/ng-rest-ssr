import {Component, OnInit} from '@angular/core';
import {TransferState} from '@angular/platform-browser';

@Component({
  selector: 'benamix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private state: TransferState) {
  }

  ngOnInit() {
  }

}

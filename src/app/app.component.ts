import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {makeStateKey, TransferState} from '@angular/platform-browser';

// const IMAGE_KEY = makeStateKey('image');

@Component({
  selector: 'benamix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // users;

  constructor(private state: TransferState) {
  }

  ngOnInit() {
    // this.getUsers();
  }

}

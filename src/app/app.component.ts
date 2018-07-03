import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {makeStateKey, TransferState} from '@angular/platform-browser';

const IMAGE_KEY = makeStateKey('image');

@Component({
  selector: 'benamix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  image: any;

  constructor(private http: HttpClient,
              private state: TransferState) {
  }

  ngOnInit() {
    const image: any = this.state.get(IMAGE_KEY, null);
    if (!image) {
      this.http.get('http://www.splashbase.co/api/v1/images/random')
        .subscribe(data => {
          this.image = data;
          this.state.set(IMAGE_KEY, data as any);
        });
    } else {
      this.image = image;
    }
  }
}

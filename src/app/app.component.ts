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

  users;

  constructor(private http: HttpClient,
              private state: TransferState) {
  }

  ngOnInit() {
    this.getUsers();
  }

  addNew() {
    const user: any = {
      name: 'asd',
      login: 'loginas',
      email: 'new@gmail.com',
      password: 'asdzxc'
    };

    this.http.post('http://localhost:3000/api/', user).subscribe(
      response => {
        this.getUsers();
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.http.get('http://localhost:3000/api/').subscribe(
      response => {
        this.users = response;
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

  deleteUser(id: string) {
    this.http.delete(`http://localhost:3000/api/${id}/`).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      }, error => {
        console.log(error);
      }
    );
  }

  updateUser(user: any) {

    const updatedUser = Object.assign({}, user);

    updatedUser.name = 'new Name';

    this.http.put('http://localhost:3000/api/', updatedUser).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      }, error => {
        console.log(error);
      }
    );
  }
}

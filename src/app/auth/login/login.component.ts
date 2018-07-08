import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'benamix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: IUser = {
    login: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.login(this.user);
  }

  getAll() {
    this.auth.getAll().subscribe(
      response => {
        // this.users = response;
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {IUser} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'benamix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visitor: IUser = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    // this.auth.login(this.user);
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

  goToChat() {
    this.router.navigate(['/chat']);
  }
}

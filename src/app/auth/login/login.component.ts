import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {IUser} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../shared/validators/pattern-validator';

@Component({
  selector: 'benamix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.forms.scss']
})
export class LoginComponent implements OnInit {

  visitor: IUser = {
    email: '',
    password: ''
  };



  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, patternValidator()]],
      password: ['', [Validators.required, Validators.minLength]]
    });
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

  OnSubmit() {
    this.goToChat();
  }
}

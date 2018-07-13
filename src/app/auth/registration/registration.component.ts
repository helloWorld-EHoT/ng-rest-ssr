import { Component, OnInit } from '@angular/core';
import {IUser} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../shared/validators/pattern-validator';
import {AuthService} from '../../shared/services/auth.service';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'benamix-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../auth.forms.scss']
})
export class RegistrationComponent implements OnInit {

  newVisitor: IUser = {
    name: '',
    email: '',
    password: ''
  };

  registrationForm: FormGroup;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength]],
      email: ['', [Validators.required, patternValidator()]],
      password: ['', [Validators.required, Validators.minLength]]
    });
  }

  // goToChat() {
  //   this.router.navigate(['/chat']);
  // }

  onSubmit() {
    // this.goToChat();
    const value = Object.assign({}, this.registrationForm.value, {login: this.registrationForm.value.login, online: true});
    this.onRegistrationDone(value);
  }

  onRegistrationDone(newUser: IUser) {
    this.api.registrateNewUser(newUser).subscribe((response: IUser) => {
        console.log('User successfully added');
        this.auth.setUser(response);
        this.auth.setLoggedState(true);
        this.router.navigate(['/chat']);
    }, error => {
      console.log(error);
    });
  }

}

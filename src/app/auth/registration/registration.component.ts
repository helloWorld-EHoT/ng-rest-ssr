import { Component, OnInit } from '@angular/core';
import {IUser} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../shared/validators/pattern-validator';

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
    private router: Router,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.builder.group({
      newName: ['', [Validators.required, Validators.minLength]],
      newEmail: ['', [Validators.required, patternValidator()]],
      newPassword: ['', [Validators.required, Validators.minLength]]
    });
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

}

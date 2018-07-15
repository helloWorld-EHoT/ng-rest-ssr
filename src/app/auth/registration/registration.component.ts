import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from '../../shared/validators/pattern-validator';
import { AuthService } from '../../shared/services/auth.service';
import { ApiService } from '../../shared/services/api.service';

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
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength]],
      email: ['', [Validators.required, patternValidator()], this.emailExistValidator.bind(this)],
      password: ['', [Validators.required, Validators.minLength]]
    });
    if (this.route.snapshot.queryParams.mail) {
      this.newVisitor.email = this.route.snapshot.queryParams.mail;
    }
  }

  goToLogin() {
    this.router.navigate(['/auth', 'login'], {queryParams: {mail: this.newVisitor.email}});
  }

  onSubmit() {
    const value = Object.assign({}, this.registrationForm.value, {login: this.registrationForm.value.login, online: true});
    this.onRegistrationDone(value);
  }

  onRegistrationDone(newUser: IUser) {
    newUser.email = newUser.email.toLowerCase();
    this.api.addNewUserToDb(newUser).subscribe((response: IUser) => {
      this.router.navigate(['/auth', 'login'], {queryParams: {mail: this.newVisitor.email}});
    }, error => {
      console.log(error);
    });
  }

  emailExistValidator(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.getUserByEmail(control.value.toLowerCase()).subscribe((user: IUser) => {
        if (user && user.name) {
          resolve({emailExist: true});
        } else {
          resolve(null);
        }
      });
    });
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from '../../shared/validators/pattern-validator';

// import {ApiService} from '../../shared/services/api.service';

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

  rememberMe = true;

  onLoginError: { state: boolean, type: string } = {
    state: false,
    type: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    // private api: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForm();
    if (this.route.snapshot.queryParams.mail) {
      this.visitor.email = this.route.snapshot.queryParams.mail;
    }
  }

  initForm() {
    this.loginForm = this.builder.group({
      // TODO: Если нжуно активировать проверку на сервере наличие почты в базе при логине (Вызов)
      // email: ['', [Validators.required, patternValidator()], this.emailExistValidator.bind(this)],
      email: ['', [Validators.required, patternValidator()]],
      password: ['', [Validators.required, Validators.minLength]]
    });
  }

  // TODO: DEBUG MODE - Удалить перед билдом.
  // getAll() {
  //   this.auth.getAll().subscribe(
  //     response => {
  //       console.log(response);
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }

  onSubmit(event) {
    event.preventDefault();
    this.auth.login(this.loginForm.value).subscribe((response: IUser) => {
      this.auth.setUser(response, this.rememberMe);
      this.auth.setLoggedState(true);
      // Navigate
      this.router.navigate(['/chat'], { queryParams: { room: 'main' }});
    }, error => {
      // this.auth.setLoggedState(false);
      this.onLoginError = {
        state: true,
        type: error.error.text
      };
      console.log(error);
    });
  }

  onErrorFocus() {
    this.onLoginError = {
      state: false,
      type: ''
    };
  }

  // TODO: Если нжуно активировать проверку на сервере наличие почты в базе при логине (Метод)
  // emailExistValidator(control: FormControl): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.api.getUserByEmail(control.value.toLowerCase()).subscribe((user: IUser) => {
  //       if (user && !user.name) {
  //         console.log(user);
  //         resolve({emailExist: true});
  //       } else {
  //         resolve(null);
  //         console.log({emailExist: true});
  //       }
  //     });
  //   });
  // }

  goToRegistration() {
    this.router.navigate(['/auth', 'registration'], {queryParams: {mail: this.visitor.email}});
  }
}

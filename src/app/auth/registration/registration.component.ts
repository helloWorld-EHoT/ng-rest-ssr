import { Component, OnInit } from '@angular/core';
import {IUser} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'benamix-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  newVisitor: IUser = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

}

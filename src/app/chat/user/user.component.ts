import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {IUser} from '../../shared/models/user.model';

@Component({
  selector: 'benamix-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: IUser;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  logOut() {
    this.auth.logOut();
  }

}

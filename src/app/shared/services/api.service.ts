import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../models/user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string) {
  }

  // registrateNewUser(newUser: IUser) {
  //   return this.http.post('http://localhost:3000/api/', newUser);
  // }

  addNewUserToDb(user: IUser) {
    return this.http.post(`${this.baseUrl}api/`, user);
  }

  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}api/${id}`);
  }

  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.post(`${this.baseUrl}api/auth/`, {email, password});
  }

  getUserByEmail(email: string) {
    return this.http.get(`${this.baseUrl}api/email/${email}`);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}api/`);
  }

  // isEmailAvailable(email: string) {
  //   return this.http.get(`http://localhost:3000/api/email/${email}`)
  //     .subscribe(response => {
  //       console.log(response);
  //     }, error => {
  //       switch (error.error.text) {
  //         case 'USER_EXIST': {
  //           return false;
  //         }
  //         case 'EMAIL_AVAILABLE': {
  //           return true;
  //         }
  //         default: {
  //           return true;
  //         }
  //       }
  //     });
  // }

  deleteUser(id: string) {
    this.http.delete(`${this.baseUrl}api/${id}/`).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      }, error => {
        console.log(error);
      }
    );
  }

  updateUser(user: IUser) {

    const updatedUser = Object.assign({}, user);

    // updatedUser.name = 'new Name';

    this.http.put(`${this.baseUrl}api/`, updatedUser).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      }, error => {
        console.log(error);
      }
    );
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../models/user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {

  }

  // registrateNewUser(newUser: IUser) {
  //   return this.http.post('http://localhost:3000/api/', newUser);
  // }

  addNewUserToDb(user: IUser) {
    return this.http.post('http://localhost:3000/api/', user);
  }

  getUserById(id: string) {
    return this.http.get(`http://localhost:3000/api/${id}`);
  }

  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.post(`http://localhost:3000/api/auth/`, {email, password});
  }

  getUserByEmail(email: string) {
    return this.http.get(`http://localhost:3000/api/email/${email}`);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/');
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
    this.http.delete(`http://localhost:3000/api/${id}/`).subscribe(
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

    updatedUser.name = 'new Name';

    this.http.put('http://localhost:3000/api/', updatedUser).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      }, error => {
        console.log(error);
      }
    );
  }

}

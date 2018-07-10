import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router
              ) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.getLoggedState() && this.auth.getUser()) {
      this.router.navigate(['/chat']);
      return true;
    } else {
      this.router.navigate(['/auth', 'login']);
      return false;
    }

  }

}

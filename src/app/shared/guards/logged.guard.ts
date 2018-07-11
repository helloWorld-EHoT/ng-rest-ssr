import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.getUser()) {
      if (!this.auth.getLoggedState()) {
        return true;
      }
    }
    this.router.navigate(['/chat']);
    return false;
  }

}

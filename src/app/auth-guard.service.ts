import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, ActivatedRoute, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const promise = this.authService.getLoginState()
      .then((login) => {
        if (login) {
          return true;
        } else {
          this.router.navigate(['/'], { relativeTo: this.activatedRouter });
          return false;
        }

      });
    return promise;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

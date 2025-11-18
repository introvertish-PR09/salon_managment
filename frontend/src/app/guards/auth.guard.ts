import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../modules/user/services/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.auth.getToken();
    if (token && this.auth.isTokenValid()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}

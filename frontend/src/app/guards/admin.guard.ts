import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/user/services/auth.service';

export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.auth.getUserRole();
    if (role === 'admin') return true;
    this.router.navigate(['/']);
    return false;
  }
}

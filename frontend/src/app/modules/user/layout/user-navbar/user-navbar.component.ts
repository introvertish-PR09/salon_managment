import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  isMenuOpen = false;
  isProfileOpen = false;

  constructor(private router: Router, private auth: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout() {
    this.auth.logout();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
    this.isProfileOpen = false;
  }
}

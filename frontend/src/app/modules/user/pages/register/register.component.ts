import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  loading = false;
  swapping = false; // for animation before route switch

  form = this.fb.group({
    username: ['', [Validators.required]],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user'] // default role
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  get fc() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.snack.open('Account created! Please login.', 'OK', { duration: 2200 });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        const msg = err?.error?.message || 'Registration failed';
        this.snack.open(msg, 'Close', { duration: 2500 });
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }

  goToLogin() {
    this.swapping = true;
    setTimeout(() => this.router.navigateByUrl('/login'), 300);
  }
}

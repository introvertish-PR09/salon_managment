import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;
  swapping = false; // for animation before route switch

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.auth.getToken();
    if (token && this.auth.isTokenValid()) {
      const role = this.auth.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user/services']);
      }
    }

  }

  get fc() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        if (res?.token) {
          this.auth.saveToken(res.token);
          const role = this.auth.getUserRole();

          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user/services']); 
          }
        }
        this.snack.open('Login successful', 'OK', { duration: 2000 });
      },
      error: (err) => {
        const msg = err?.error?.message || 'Login failed';
        this.snack.open(msg, 'Close', { duration: 2500 });
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }


  goToRegister() {
    // play swap animation then navigate
    this.swapping = true;
    setTimeout(() => this.router.navigateByUrl('/register'), 300);
  }
}

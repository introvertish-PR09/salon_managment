import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

//MAT
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './pages/nav/nav.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './pages/services/services.component';
import { BookServiceDialogComponent } from './dialogs/book-service-dialog/book-service-dialog.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserNavbarComponent } from './layout/user-navbar/user-navbar.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NavComponent,
    ServicesComponent,
    BookServiceDialogComponent,
    MyBookingsComponent,
    UserNavbarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class UserModule { }

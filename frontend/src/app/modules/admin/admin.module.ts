import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';;
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ManageServicesComponent } from './pages/manage-services/manage-services.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServiceDialogComponent } from './pages/manage-services/service-dialog/service-dialog.component';
import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';

@NgModule({
  declarations: [
    ManageServicesComponent,
    AdminLayoutComponent,
    DashboardComponent,
    ServiceDialogComponent,
    ManageBookingsComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatChipsModule
  ]
})
export class AdminModule { }

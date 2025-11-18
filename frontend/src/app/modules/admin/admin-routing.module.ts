import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageServicesComponent } from './pages/manage-services/manage-services.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'services', component: ManageServicesComponent },
      {path : 'users',component : ManageUsersComponent},
      {path : 'bookings' , component : ManageBookingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

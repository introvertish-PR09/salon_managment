import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';


@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent  implements OnInit{
  displayedColumns: string[] = ['name', 'price', 'duration', 'isActive', 'actions'];
  dataSource: any[] = [];
  loading = false;

  constructor(private serviceService: ServiceService, private snack: MatSnackBar,private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices() {
    this.loading = true;
    this.serviceService.getAll().subscribe({
      next: (res) => {
        this.dataSource = res.items || res;
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to fetch services', 'Close', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  toggleService(id: string) {
    this.serviceService.toggleActive(id).subscribe(() => {
      this.snack.open('Status updated', 'OK', { duration: 2000 });
      this.fetchServices();
    });
  }

  deleteService(id: string) {
    if (!confirm('Delete this service?')) return;
    this.serviceService.deleteService(id).subscribe(() => {
      this.snack.open('Service deleted', 'OK', { duration: 2000 });
      this.fetchServices();
    });
  }

  openAddDialog() {
  const dialogRef = this.dialog.open(ServiceDialogComponent, { width: '450px' });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) this.fetchServices();
  });
}

openEditDialog(service: any) {
  const dialogRef = this.dialog.open(ServiceDialogComponent, { width: '450px', data: service });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) this.fetchServices();
  });
}
  
}

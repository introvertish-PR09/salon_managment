import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/modules/admin/services/service.service';
import { BookServiceDialogComponent } from '../../dialogs/book-service-dialog/book-service-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];
  loading = false;

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.serviceService.getAll().subscribe({
      next: (res) => {
        this.services = res.items || res;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  openBookingDialog(service: any) {
    this.dialog.open(BookServiceDialogComponent, {
      width: '400px',
      data: service
    });
  }
} 

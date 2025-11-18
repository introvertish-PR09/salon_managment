import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(1)]],
    duration: ['', Validators.required],
    description: [''],
    image: [''],
    isActive: [true]
  });

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceService: ServiceService,
    private snack: MatSnackBar
  ) {
    if (data) {
      this.isEdit = true;
      this.form.patchValue(data);
    }
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    if (this.isEdit) {
      this.serviceService.updateService(this.data._id, payload).subscribe({
        next: () => {
          this.snack.open('Service updated', 'OK', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: () => this.snack.open('Update failed', 'Close', { duration: 2500 })
      });
    } else {
      this.serviceService.createService(payload).subscribe({
        next: () => {
          this.snack.open('Service added', 'OK', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: () => this.snack.open('Add failed', 'Close', { duration: 2500 })
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}

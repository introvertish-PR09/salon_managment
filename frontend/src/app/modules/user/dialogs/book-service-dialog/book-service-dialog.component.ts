import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-book-service-dialog',
  templateUrl: './book-service-dialog.component.html',
  styleUrls: ['./book-service-dialog.component.css']
})
export class BookServiceDialogComponent {
  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public service: any,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<BookServiceDialogComponent>
  ) {}

  submit() {
    if (this.form.invalid) return;
    const data = {
      serviceId: this.service._id,
      ...this.form.value
    };

    this.bookingService.createBooking(data).subscribe({
      next: () => {
        this.snack.open('Booking confirmed successfully!', 'OK', { duration: 2500 });
        this.dialogRef.close(true);
      },
      error: () => this.snack.open('Failed to create booking', 'Close', { duration: 2500 })
    });
  }
}

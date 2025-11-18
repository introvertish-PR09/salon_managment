import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = false;

  constructor(private bookingService: BookingService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.loading = true;
    this.bookingService.getMyBookings().subscribe({
      next: (res: any[]) => {
        this.bookings = res;
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to load bookings', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }

  cancelBooking(id: string) {
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.snack.open('Booking cancelled', 'OK', { duration: 2000 });
        this.fetchBookings();
      },
      error: () => this.snack.open('Failed to cancel', 'Close', { duration: 2000 })
    });
  }
}
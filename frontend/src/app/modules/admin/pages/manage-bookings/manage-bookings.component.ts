import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminBookingService } from '../../services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = false;

  page = 1;
  limit = 10;
  total = 0;
  q = '';
  sortBy = 'date';
  sortDir: 'asc'|'desc' = 'asc';
  pageSizeOptions = [5, 10, 20];

  constructor(private bookingService: AdminBookingService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.fetch();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit) || 1;
  }

  prevPage(): number {
    return this.page > 1 ? this.page - 1 : 1;
  }

  nextPage(): number {
    return this.page < this.totalPages ? this.page + 1 : this.totalPages;
  }

  chipColor(status: string | undefined) {
    if (!status) return undefined;
    const s = status.toLowerCase();
    if (s === 'pending') return 'warn';
    if (s === 'confirmed') return 'primary';
    if (s === 'completed') return undefined;
    if (s === 'cancelled') return undefined;
    return undefined;
  }

  fetch() {
    this.loading = true;
    this.bookingService.list({
      q: this.q,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortDir: this.sortDir
    }).subscribe({
      next: (res: any) => {
        if (res?.items && typeof res.total !== 'undefined') {
          this.bookings = res.items;
          this.total = res.total;
        } else if (Array.isArray(res)) {
          this.bookings = res;
          this.total = res.length;
        } else {
          this.bookings = [];
          this.total = 0;
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Load bookings error', err);
        this.snack.open('Failed to load bookings', 'Close', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  onSearch(q: string) {
    this.q = q;
    this.page = 1;
    this.fetch();
  }

  changePage(page: number) {
    this.page = page;
    this.fetch();
  }

  changeLimit(limit: string) {
    this.limit = Number(limit);
    this.page = 1;
    this.fetch();
  }

  toggleSort(column: string) {
    if (this.sortBy === column) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    else { this.sortBy = column; this.sortDir = 'asc'; }
    this.fetch();
  }

  updateStatus(b: any, status: string) {
    this.bookingService.updateStatus(b.bookingId, status).subscribe({
      next: () => {
        this.snack.open('Status updated', 'OK', { duration: 2000 });
        this.fetch();
      },
      error: () => this.snack.open('Update failed', 'Close', { duration: 2500 })
    });
  }

  deleteBooking(id: string) {
    if (!confirm('Delete booking?')) return;
    this.bookingService.delete(id).subscribe({
      next: () => {
        this.snack.open('Booking deleted', 'OK', { duration: 2000 });
        this.fetch();
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 2500 })
    });
  }
}

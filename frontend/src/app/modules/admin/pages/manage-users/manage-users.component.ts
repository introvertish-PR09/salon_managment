import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  loading = false;

  page = 1;
  limit = 10;
  total = 0;
  q = '';
  sortBy = 'username';
  sortDir: 'asc' | 'desc' = 'asc';

  pageSizeOptions = [5, 10, 20];

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.fetch();
  }

  // Pagination helpers
  get totalPages(): number {
    return Math.ceil(this.total / this.limit) || 1;
  }

  prevPage() {
    return this.page > 1 ? this.page - 1 : 1;
  }

  nextPage() {
    return this.page < this.totalPages ? this.page + 1 : this.totalPages;
  }

  // Sort icon helper
  showSortIcon(col: string) {
    if (this.sortBy !== col) return '';
    return this.sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  // Fetch users
  fetch() {
    this.loading = true;

    this.userService.list({
      q: this.q,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortDir: this.sortDir
    }).subscribe({
      next: (res: any) => {
        if (res?.items && res?.total >= 0) {
          this.users = res.items;
          this.total = res.total;
        } else {
          this.users = res || [];
          this.total = this.users.length;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Failed to load users', 'Close', { duration: 2000 });
      }
    });
  }

  // Search
  onSearch(text: string) {
    this.q = text;
    this.page = 1;
    this.fetch();
  }

  // Change rows per page
  changeLimit(value: string) {
    this.limit = Number(value);
    this.page = 1;
    this.fetch();
  }

  // Pagination
  changePage(page: number) {
    this.page = page;
    this.fetch();
  }

  // Sorting
  toggleSort(col: string) {
    if (this.sortBy === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = col;
      this.sortDir = 'asc';
    }
    this.fetch();
  }

  // Delete user
  deleteUser(id: string) {
    if (!confirm('Delete this user?')) return;

    this.userService.delete(id).subscribe({
      next: () => {
        this.snack.open('User deleted', 'OK', { duration: 2000 });
        this.fetch();
      },
      error: () =>
        this.snack.open('Delete failed', 'Close', { duration: 2000 })
    });
  }

  // Change role
  editUser(user: any) {
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    this.userService.update(user._id, { role: newRole }).subscribe({
      next: () => {
        this.snack.open('User updated', 'OK', { duration: 2000 });
        this.fetch();
      },
      error: () =>
        this.snack.open('Update failed', 'Close', { duration: 2000 })
    });
  }
}

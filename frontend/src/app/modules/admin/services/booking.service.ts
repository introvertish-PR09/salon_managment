import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminBookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token') || '';
    return { Authorization: `Bearer ${token}` };
  }

  list(params?: { q?: string; page?: number; limit?: number; sortBy?: string; sortDir?: 'asc'|'desc' }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.q) httpParams = httpParams.set('q', String(params.q));
    if (params?.page) httpParams = httpParams.set('page', String(params.page));
    if (params?.limit) httpParams = httpParams.set('limit', String(params.limit));
    if (params?.sortBy) httpParams = httpParams.set('sortBy', params.sortBy || '');
    if (params?.sortDir) httpParams = httpParams.set('sortDir', params.sortDir || '');
    return this.http.get(this.apiUrl, { headers: this.headers(), params: httpParams });
  }

  getByUUID(bookingId: string) {
    return this.http.get(`${this.apiUrl}/${bookingId}`, { headers: this.headers() });
  }

  updateStatus(bookingId: string, status: string) {
    return this.http.put(`${this.apiUrl}/${bookingId}/status`, { status }, { headers: this.headers() });
  }

  delete(bookingId: string) {
    return this.http.delete(`${this.apiUrl}/${bookingId}`, { headers: this.headers() });
  }
}

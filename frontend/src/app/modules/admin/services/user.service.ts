import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

 private headers(isFormData = false) {
    const token = localStorage.getItem('token') || '';

    return isFormData
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        });
  }

  // ---------- USER PROFILE ----------
 getMyProfile(): Observable<any> {
  return this.http.get(`${this.apiUrl}/me`, {
    headers: this.headers()
  });
}

  updateMyProfile(data: any): Observable<any> {
    const isFormData = data instanceof FormData;

    return this.http.put(`${this.apiUrl}/me`, data, {
      headers: this.headers(isFormData)
    });
  }

  // ---------- ADMIN OPERATIONS ----------
  list(params?: any): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.q) httpParams = httpParams.set('q', params.q);
    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.limit) httpParams = httpParams.set('limit', params.limit);
    if (params?.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params?.sortDir) httpParams = httpParams.set('sortDir', params.sortDir);

    return this.http.get(this.apiUrl, {
      headers: this.headers(),
      params: httpParams
    });
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.headers()
    });
  }

  update(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.headers()
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers()
    });
  }
}

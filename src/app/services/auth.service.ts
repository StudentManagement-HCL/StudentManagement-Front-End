import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5035/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  adminLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, credentials).pipe(
      tap(res => this.storeToken(res))
    );
  }

  studentLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/student/login`, credentials).pipe(
      tap(res => this.storeToken(res))
    );
  }
adminRegister(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/admin/register`, data);
}

studentRegister(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/student/register`, data);
}
  private storeToken(res: LoginResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('userId', res.userId.toString());
    localStorage.setItem('name', res.name);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getName(): string | null {
    return localStorage.getItem('name');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
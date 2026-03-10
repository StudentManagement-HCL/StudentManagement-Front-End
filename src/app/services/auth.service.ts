import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/auth';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5035/api/Auth';
  private sessionTimeout: any;
  private warningTimeout: any;
  private sessionDuration = 10 * 60 * 1000;    // 1 minutes
  private warningBefore = 1 * 60 * 1000;        // warn 1/2 minute before expiry

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  adminLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, credentials).pipe(
      tap(res => {
        this.storeToken(res);
        this.startSessionTimer();
      })
    );
  }

  studentLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/student/login`, credentials).pipe(
      tap(res => {
        this.storeToken(res);
        this.startSessionTimer();
      })
    );
  }

  adminRegister(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/register`, data);
  }

  private storeToken(res: LoginResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('userId', res.userId.toString());
    localStorage.setItem('name', res.name);
    localStorage.setItem('loginTime', Date.now().toString());
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getRole(): string | null { return localStorage.getItem('role'); }
  getUserId(): string | null { return localStorage.getItem('userId'); }
  getName(): string | null { return localStorage.getItem('name'); }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !!token && !!role;
  }

  // ✅ Start session timer
  startSessionTimer() {
    this.clearSessionTimer();

    // Warning alert 1 minute before session expires
    this.ngZone.runOutsideAngular(() => {
      this.warningTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          Swal.fire({
            icon: 'warning',
            title: 'Session Expiring Soon!',
            text: 'Your session will expire in 1 minute. Do you want to stay logged in?',
            showCancelButton: true,
            confirmButtonColor: '#1976d2',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Keep me logged in!',
            cancelButtonText: 'Logout',
            timer: 60000,           // auto closes in 1 minute
            timerProgressBar: true
          }).then((result) => {
            if (result.isConfirmed) {
              // Reset session timer
              this.startSessionTimer();
              Swal.fire({
                icon: 'success',
                title: 'Session Extended!',
                text: 'Your session has been extended.',
                timer: 1500,
                showConfirmButton: false
              });
            } else {
              // User clicked logout or timer ran out
              this.forceLogout();
            }
          });
        });
      }, this.sessionDuration - this.warningBefore);

      // Auto logout after session duration
      this.sessionTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          this.forceLogout();
        });
      }, this.sessionDuration);
    });
  }

  // ✅ Clear timers
  clearSessionTimer() {
    if (this.sessionTimeout) clearTimeout(this.sessionTimeout);
    if (this.warningTimeout) clearTimeout(this.warningTimeout);
  }

  // ✅ Force logout when session expires
  forceLogout() {
    this.clearSessionTimer();
    localStorage.clear();
    Swal.fire({
      icon: 'info',
      title: 'Session Expired!',
      text: 'Your session has expired. Please login again.',
      confirmButtonColor: '#1976d2',
      confirmButtonText: 'Go to Login'
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  // ✅ Manual logout with confirmation
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearSessionTimer();
        localStorage.clear();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
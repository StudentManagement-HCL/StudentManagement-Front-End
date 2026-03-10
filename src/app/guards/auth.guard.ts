import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = this.auth.getToken();
    const role = this.auth.getRole();

    // No token = not logged in = redirect to login
    if (!token || !role) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      this.auth.logout();
      this.router.navigate(['/login']);
      return false;
    }

    // Check role matches the route
    const expectedRole = route.data['role'];
    if (expectedRole && role !== expectedRole) {
      if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/student-dashboard']);
      }
      return false;
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() > payload.exp * 1000;
    } catch {
      return true;
    }
  }
}
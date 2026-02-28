import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.formData.phoneNumber.length !== 10) {
      this.errorMessage = 'Phone number must be 10 digits.';
      return;
    }

    this.loading = true;

    const payload = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber,
      password: this.formData.password
    };

    this.auth.adminRegister(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.successMessage = 'Admin registered successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
      }
    });
  }
}
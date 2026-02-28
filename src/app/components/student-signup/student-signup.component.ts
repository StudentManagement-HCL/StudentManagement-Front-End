import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent {
  formData = {
    firstName: '',
    lastName: '',
    gender: '',
    doB: '',
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
      gender: this.formData.gender,
      doB: this.formData.doB,
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber,
      password: this.formData.password
    };
    console.log('Sending payload:', payload); 

    this.auth.studentRegister(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.successMessage = 'Student registered successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
      }
    });
  }
}
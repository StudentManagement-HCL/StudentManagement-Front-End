import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role: 'Admin' | 'Student' = 'Student';
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.loading = true;
    const credentials = { email: this.email, password: this.password };

    const loginCall = this.role === 'Admin'
      ? this.auth.adminLogin(credentials)
      : this.auth.studentLogin(credentials);

    loginCall.subscribe({
      next: (res:any) => {
        this.loading = false;
        localStorage.setItem("user",JSON.stringify(res));
      
        // ✅ Sweet alert on login success
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${res.name}!`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          if (res.role === 'Admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/student-dashboard']);
          }
        });
      },
      error: (err) => {
        this.loading = false;

        // ✅ Sweet alert on login failure
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: err.error?.message || 'Invalid email or password.',
          confirmButtonColor: '#1976d2'
        });
      }
    });
  }
}
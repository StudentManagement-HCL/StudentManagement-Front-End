import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role: 'Admin' | 'Student' = 'Admin';
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

  // ⭐ Save logged-in user
  localStorage.setItem("user", JSON.stringify(res));

  if (res.role === 'Admin') {
    this.router.navigate(['/admin-dashboard']);
  } else {
    this.router.navigate(['/student-dashboard']);
  }

},
    error: (err) => {
      this.loading = false;
      this.errorMessage = err.error?.message || 'Login failed. Check your credentials.';
    }
  });
}
}
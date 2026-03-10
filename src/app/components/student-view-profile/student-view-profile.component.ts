import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-view-profile',
  templateUrl: './student-view-profile.component.html',
  styleUrls: ['./student-view-profile.component.css']
})
export class StudentViewProfileComponent implements OnInit {

  profile: any = null;
  loading = true;
  errorMsg = '';

  private apiBase = 'http://localhost:5035/api/studentedit';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadProfile(): void {
    this.http.get<any>(`${this.apiBase}/profile`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.profile = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Failed to load profile. Please try again.';
          this.loading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }

  goToEditProfile(): void {
    this.router.navigate(['/student-edit-profile']);
  }
}
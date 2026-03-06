import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-edit-profile',
  templateUrl: './student-edit-profile.component.html',
  styleUrls: ['./student-edit-profile.component.css']
})
export class StudentEditProfileComponent implements OnInit {

  private readonly newProperty = './student-edit-profile.component.html';

  profile: any = {};
  phone = '';
  city  = '';
  state = '';

  loading   = false;
  submitted = false;
  updatedData: any = null;
  errorMsg  = '';

  // ⚠️ Change port if your .NET runs on a different port
  private apiBase = 'http://localhost:5035/api/studentedit';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadProfile() {
    this.http.get<any>(`${this.apiBase}/profile`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.profile = data;
          this.phone   = data.phone  ?? '';
          this.city    = data.city   ?? '';
          this.state   = data.state  ?? '';
        },
        error: () => {
          this.errorMsg = 'Failed to load profile. Please try again.';
        }
      });
  }

  onSubmit() {
    if (!this.phone || !this.city || !this.state) {
      this.errorMsg = 'All fields are required.';
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const body = { phone: this.phone, city: this.city, state: this.state };

    this.http.put<any>(`${this.apiBase}/update`, body, { headers: this.getHeaders() })
      .subscribe({
        next: (res) => {
          this.loading     = false;
          this.submitted   = true;
          this.updatedData = res;
        },
        error: () => {
          this.loading  = false;
          this.errorMsg = 'Update failed. Please try again.';
        }
      });
  }

  editAgain() {
    this.submitted = false;
    this.updatedData = null;
  }

  goBack() {
    this.router.navigate(['/student-dashboard']);
  }
}





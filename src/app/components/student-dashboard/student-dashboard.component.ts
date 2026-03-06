import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls:['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  name = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.name = this.auth.getName() || 'Student';
  }
   goToEditProfile() {
    this.router.navigate(['/student-edit-profile']);
  }
  logout() {
    this.auth.logout();
  }
}
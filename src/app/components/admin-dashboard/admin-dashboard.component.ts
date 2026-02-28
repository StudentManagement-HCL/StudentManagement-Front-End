import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
 styleUrls:  ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  name = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.name = this.auth.getName() || 'Admin';
  }

  logout() {
    this.auth.logout();
  }
}
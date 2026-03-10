import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // If user refreshes page and is still logged in, restart timer
    if (this.auth.isLoggedIn()) {
      this.auth.startSessionTimer();
    }
  }

  // ✅ Reset timer on any user activity
  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:scroll')
  onUserActivity() {
    if (this.auth.isLoggedIn()) {
      this.auth.startSessionTimer();
    }
  }

  // ✅ Clear storage on browser close
  @HostListener('window:beforeunload')
  onBrowserClose() {
    localStorage.clear();
  }
}
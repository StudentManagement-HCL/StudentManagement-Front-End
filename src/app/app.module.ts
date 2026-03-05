import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentEditProfileComponent } from './components/student-edit-profile/student-edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    AdminSignupComponent,
    StudentSignupComponent,
    AdminSignupComponent,   
    StudentSignupComponent, StudentEditProfileComponent

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,BrowserAnimationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
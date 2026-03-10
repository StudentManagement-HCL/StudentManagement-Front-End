import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentViewProfileComponent } from './components/student-view-profile/student-view-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { StudentEditProfileComponent } from './components/student-edit-profile/student-edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Student' }
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'student-edit-profile',
    component: StudentEditProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'Student' }
  },
  {
    path: 'student-view-profile',
    component: StudentViewProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'Student' }
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
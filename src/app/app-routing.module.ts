import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentEditProfileComponent } from './components/student-edit-profile/student-edit-profile.component'; // ✅ add this
import { authGuard } from './guards/auth.guard';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [authGuard], data: { role: 'Student' } },
  { path: 'student-edit-profile', component: StudentEditProfileComponent, canActivate: [authGuard], data: { role: 'Student' } }, // ✅ add this
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
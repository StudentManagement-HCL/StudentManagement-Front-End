import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  name: string = '';
  students: any[] = [];

  showAddForm = false;
  showTable = false;

  editingId: number | null = null;

  student = {
    name: '',
    age: 0,
    department: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    dob:''
  };

  showToast = false;
  toastMessage = '';

  constructor(
    private auth: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.name = this.auth.getName() || 'Admin';
  }

  logout() {
    this.auth.logout();
  }

  getStudents() {
    this.adminService.getStudents().subscribe((res: any) => {
      this.students = res;
      this.showTable = true;
      this.showAddForm = false;
    });
  }

  onSubmit(form: any) {

    if (this.editingId !== null) {

      this.adminService.updateStudent(this.editingId, this.student)
        .subscribe(() => {
          this.showSuccess('Student updated successfully!');
          this.getStudents();
          this.resetForm(form);
        });

    } else {

      this.adminService.AddStudent(this.student)
        .subscribe(() => {
          this.showSuccess('Student added successfully!');
          this.resetForm(form);
        });
    }
  }

  resetForm(form: any) {
    form.resetForm();

    this.student = {
      name: '',
      age: 0,
      department: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      dob:''
    };

    this.editingId = null;
  }

  editStudent(student: any) {
    this.student = { ...student };
    this.editingId = student.id;
    this.showAddForm = true;
  }

  deleteStudent(id: number) {
    this.adminService.deleteStudent(id).subscribe(() => {
      this.showSuccess('Student deleted successfully!');
      this.getStudents();
    });
  }

  showSuccess(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }
}
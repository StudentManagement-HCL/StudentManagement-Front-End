import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  name: string = '';
  students: any[] = [];
  paginatedStudents: any[] = [];

  showAddForm = false;
  showTable = false;

  editingId: number | null = null;

  // 🔹 Pagination Variables
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  student = {
    name: '',
    age: 0,
    department: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    dob: '',
  };

  showToast = false;
  toastMessage = '';

  constructor(private auth: AuthService, private adminService: AdminService) {}

  ngOnInit() {
    this.name = this.auth.getName() || 'Admin';
  }

  logout() {
    this.auth.logout();
  }

  // ✅ Get Students with Pagination Setup
  getStudents() {
    this.adminService.getStudents().subscribe((res: any) => {
      this.students = res;
      this.showTable = true;
      this.showAddForm = false;

      this.currentPage = 1;
      this.totalPages = Math.ceil(this.students.length / this.itemsPerPage);
      this.updatePagination();
    });
  }

  // ✅ Update Paginated Data
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStudents = this.students.slice(startIndex, endIndex);
  }

  // ✅ Next Page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // ✅ Previous Page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onSubmit(form: any) {
    if (this.editingId !== null) {
      this.adminService
        .updateStudent(this.editingId, this.student)
        .subscribe(() => {
          this.showSuccess('Student updated successfully!');
          this.getStudents();
          this.resetForm(form);
        });
    } else {
      this.adminService.AddStudent(this.student).subscribe(() => {
        this.showSuccess('Student added successfully!');
        this.getStudents(); // refresh table
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
      dob: '',
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
      this.getStudents(); // refresh with pagination
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

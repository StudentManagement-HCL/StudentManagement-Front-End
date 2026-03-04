import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5035/api/Student';

  getStudents() {
    return this.http.get(`${this.apiUrl}/GetStudents`);
  }

  AddStudent(student: any) {
    return this.http.post(`${this.apiUrl}/AddStudent`, student);
  }

  updateStudent(id: number, student: any) {
    return this.http.put(`${this.apiUrl}/EditStudent/${id}`, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/DeleteStudent/${id}`);
  }
}

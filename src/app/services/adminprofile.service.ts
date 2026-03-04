import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminprofileService {

  constructor(private http: HttpClient) {}

getAdminProfile() {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const adminId = user.userId;
  return this.http.get(
    `http://localhost:5035/api/AdminProfile/profile/${adminId}`
  );

}

  updateAdminProfile(data:any){
    return this.http.put("http://localhost:5035/api/AdminProfile/update",data);
  }

}
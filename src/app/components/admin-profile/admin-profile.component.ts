import { Component, OnInit } from '@angular/core';
import { AdminprofileService } from 'src/app/services/adminprofile.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  adminProfile: any;
  editMode = false;

  constructor(private adminProfileService: AdminprofileService) {}

  ngOnInit(): void {
    this.loadAdminProfile();
  }

  loadAdminProfile() {

    this.adminProfileService.getAdminProfile().subscribe(
      (data) => {
        this.adminProfile = data;
      },
      (error) => {
        console.error('Error fetching admin profile:', error);
      }
    );

  }

  updateProfile(){

    this.adminProfileService.updateAdminProfile(this.adminProfile)
      .subscribe(res => {

        alert("Profile Updated Successfully");
        this.editMode = false;

      });

  }

}
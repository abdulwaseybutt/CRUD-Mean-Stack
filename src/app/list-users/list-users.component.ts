import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileType, fileMaxSize, MatFileUploadComponent } from '@webacad/ng-mat-file-upload';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  
  faEdit = faEdit;
  faRemove = faTrash;
  users: any = [];

  isDelete: Boolean;
  successMessage: any;
  errorMessage: any;
  alertClass: string;

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userService
    .get_user()
    .subscribe((data: any) => {
      this.users = data['users'];
      this.users.sort((a,b) => a.user_name.localeCompare(b.user_name));
    });
  }

  update_user(user){
    this.router.navigate(['/edit', user]);
  }

  delete_user(user_id){
    this.userService.delete_user(user_id).subscribe(
      (data: any) => {
        if (data) {
          if (data.message) {
            this.isDelete = true;
            this.alertClass = 'alert-success';
            this.successMessage = data.message;
            this.errorMessage = '';
            setTimeout(() => {
              this.isDelete = false;
              this.successMessage = '';
            }, 2000);
          } else {
            this.isDelete = true;
            this.alertClass = 'alert-danger';
            this.successMessage = 'Error while deleting..';
            setTimeout(() => {
              this.isDelete = false;
              this.successMessage = '';
            }, 2000);
          }
          this.ngOnInit();
        } else {
          this.isDelete = false;
        }
      });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  userFormControl: FormGroup;
  isRegister: Boolean;
  successMessage: any;
  errorMessage: any;
  alertClass: string;

  
  ngOnInit() {
    this.userFormControl = new FormGroup(
      {
        'user_name': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
        'user_email': new FormControl('', [Validators.required, Validators.email]),
        'user_role': new FormControl('', Validators.required),
        'user_avatar': new FormControl(''),
        'user_status': new FormControl('active', Validators.required),
      }
    )
    this.route.params.subscribe(params => {
      this.userFormControl.controls['user_name'].setValue(params['user_name']);
      this.userFormControl.controls['user_email'].setValue(params['user_email']);
      this.userFormControl.controls['user_role'].setValue(params['user_role']);
      this.userFormControl.controls['user_avatar'].setValue(params['user_avatar']);
      this.userFormControl.controls['user_status'].setValue(params['user_status']);
    });
   
  }


  update_user(){
    let myData = new FormData();
    myData.append('user_name', this.userFormControl.value.user_name);
    myData.append('user_email', this.userFormControl.value.user_email);
    myData.append('user_role', this.userFormControl.value.user_role);
    myData.append('user_avatar', this.userFormControl.value.user_avatar);
    myData.append('user_status', this.userFormControl.value.user_status);

    if ( this.userFormControl.value.user_email ) {
      this.userService.update_user(myData).subscribe(
        (data: any) => {
          if (data) {
            if (data.message) {
              this.isRegister = true;
              this.alertClass = 'alert-success';
              this.successMessage = data.message;
              this.errorMessage = '';
              setTimeout(() => {
                this.isRegister = false;
                this.successMessage = '';
              }, 2000);
            } else {
              this.isRegister = true;
              this.alertClass = 'alert-danger';
              this.successMessage = 'Could not update';
              setTimeout(() => {
                this.isRegister = false;
                this.successMessage = '';
              }, 2000);
            }
          } else {
            this.isRegister = false;
          }
        }
      );
    }
  }
}

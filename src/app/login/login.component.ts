import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata: FormGroup;
  u_email: any;
  u_pass: any;
  isLogin: Boolean = false;
  logIncorrect: Boolean = false;
  userStatus: any = false;

  constructor(private userData: UserService, private router: Router) { }

  ngOnInit() {
    this.logindata = new FormGroup(
      {
        'user_email': new FormControl(null,[Validators.required, Validators.email]),
        'user_password': new FormControl(null,Validators.required)
      }
    )
  }
  login(){
    this.u_email = this.logindata.value.user_email;
    this.u_pass = this.logindata.value.user_password;
    if(this.u_email && this.u_pass ){
      // this.userData.get_all_users(this.u_email,this.u_pass).subscribe(
      //   (data: any)=>{
      //     if(data.count && data.count > 0){
      //       this.userStatus = data.users[0].user_status;
      //       if(this.userStatus == 'true'){
      //         this.isLogin = true;
      //         sessionStorage.setItem('isLoggedIn', "true");
      //         sessionStorage.setItem('token', this.u_email);
      //         sessionStorage.setItem('user_id', data.users[0]._id);
      //         sessionStorage.setItem('user_role', data.users[0].user_role);
      //         this.router.navigate(['/admin/new-client']);
      //       }
      //     }else{
      //       this.logIncorrect = true;
      //     }
      //   });
    }
  }
}


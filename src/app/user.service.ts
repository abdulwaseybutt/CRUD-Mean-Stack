import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = 'http://localhost:4000/users';
  
  myData: any;

  constructor(private http: HttpClient) { }
  
  register_user(obj){
    return this.http.post(this.users + '/add', obj);
  }
  
  get_user(){
    return  this.http.get(this.users);
  }
  
  update_user(obj){
    return this.http.post(this.users+'/update',obj);
  }
 
  delete_user(u_id) {
    return this.http.delete(this.users+'/'+u_id);
  }

  get_one(u_email){
    return this.http.get(this.users+'/'+u_email)
  }
}

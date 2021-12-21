import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = {
    _id: '0',
    firstName: 'Connor',
    lastName: 'Williams',
    email: 'connor.williams@tcs.com',
    password: 'password',
    roleId: 'User',
    phone: 1234567890,
    interests: '',
    address: ['','','',0]
  }
  //token : string = "";

  private token!: string;

  private authStatusListner = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http : HttpClient, private router: Router) { }


  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  getToken() {
    return this.token;
  }
  createNewUser(newUser: User){
    //add user to db (use for registering a new user)
    this.http.post('http://localhost:3000/registerUser', newUser)
    .subscribe(response => {
      console.log(response);
    });
  }

  signInUser(loginData : any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/loginUser', loginData)
      .subscribe(
        (res : any) => {
          this.currentUser = res.userData;
          this.token = res.token;
          
          resolve(res);
          if(this.token){
            this.isAuthenticated = true;
            this.authStatusListner.next(true);
          }
          
        },
        (error) => {
          reject(error)
          
        }
      )
    });
    
  }

  logout(){
    this.token = null as any;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }
 


}





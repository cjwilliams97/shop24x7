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
    var userData = JSON.parse(document.cookie).userData;
    return userData;
  }
  getToken() {
    var token = JSON.parse(document.cookie).userToken
    if (token != undefined) {
      return token
    }
    else {
      return "";
    }
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
          var CookieObj = {userToken: res.token, userData: res.userData}
          document.cookie = JSON.stringify(CookieObj);

          resolve(res)
          
          resolve(res);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          
        },
        (error) => {
          reject(error)
          
        }
      )
    });
    
  }

  logout(){
    var CookieObj = {userToken: "", userData: ""}
    document.cookie = JSON.stringify(CookieObj);
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }
 


}





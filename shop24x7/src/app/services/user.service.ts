import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
  token : string = "";
  constructor(private http : HttpClient) { }

  getCurrentUser() {
    return this.currentUser;
  }
  getToken() {
    return this.token;
  }
  createNewUser(newUser: User){
    //add user to db (use for registering a new user)
  }
  signInUser(loginData : any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/loginUser', loginData)
      .subscribe(
        (res : any) => {
          this.currentUser = res.userData
          this.token = res.token
          resolve(res)
        },
        (error) => {
          reject(error)
          
        }
      )
    })
    
  }
}

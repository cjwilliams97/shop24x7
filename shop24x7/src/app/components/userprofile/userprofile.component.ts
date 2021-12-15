import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  editAddress: any;

  constructor() { 
    this.editAddress = false;
  }

  // addressModel = {
  //   streetAddress: '',
  //   city: '',
  //   state: '',
  //   zipCode: 0
  // }

  testUser: User = {
    firstName: 'Nick',
    lastName: 'Cooper',
    email: 'nick@gmail.com',
    phone: 1234567890,
    profileImage:'url',
    interests: 'basketball, walking, video games',
    address: ['123 main street', 'San Francisco', 'CA', 82928],
  };

  ngOnInit(): void {
    console.log("test");
  }

  submitMyData(myForm: any) {
    console.log("test");
    this.testUser.address[0] = myForm.streetAddress;
    this.testUser.address[1] = myForm.city;
    this.testUser.address[2] = myForm.state;
    this.testUser.address[3] = myForm.zipCode;
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { NgForm } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';

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

  // transform(){
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  // }

  addressModel = {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: 0
  }

  // addressModel = ['', '', '', 0];
  testUser: User = {
    _id: '1001',
    firstName: 'Nick',
    lastName: 'Cooper',
    email: 'nick@gmail.com',
    password: '',
    roleId: 'administrator',
    phone: 1234567890,
    interests: 'basketball, walking, video games',
    address: ['123 main street', 'San Francisco', 'CA', 82928],
  };

  // profilePhoto = require("../../images/default-profile-pic-150x150.jpeg");

  // checkImage(url: string) {
  //   var image = new Image();
  //   image.onload = function() {
  //     if (this.width > 0) {
  //       console.log("image exists");
  //     }
  //   }
  //   image.onerror = function() {
  //     console.log("image doesn't exist");
  //   }
  //   image.src = url;
  // }
  // checkImage("https://picsum.photos/200/300");

  

  ngOnInit(): void {
    console.log("test");
  }

  submitMyData(myForm: NgForm) {
    // console.log("submitMyData");
    // console.log("myform.value: " + JSON.stringify(myForm.value));
    // console.log("myform.form.value: " + myForm.form.value);
    // console.log("address mdoel: " + JSON.stringify(this.addressModel));
    this.editAddress = false;
    this.testUser.address[0] = myForm.value['streetAddress'];
    this.testUser.address[1] = myForm.value['city'];
    this.testUser.address[2] = myForm.value['state'];
    this.testUser.address[3] = +myForm.value['zipCode'];
    console.log(this.testUser);
  }

  test(){
    console.log("test");
  }

}

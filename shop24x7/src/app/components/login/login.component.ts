import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  userDNE = false;
  invalidPassword = false;
  logInForm : FormGroup = this._formBuilder.group({})

  constructor(private _formBuilder : FormBuilder, private _userService : UserService, private _router : Router) { }

  ngOnInit(): void {
    this.logInForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  get f() {
    return this.logInForm.controls;
  }
  checkRequiredValidation(control: string) {
    return this.f[control].errors?.['required'];
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.logInForm.invalid) {
      //Form was filled out incorrectly, so do not submit to server
      return;
    }
    else {
      const loginData = {
        email: this.logInForm.value.email,
        password: this.logInForm.value.password
      }
      this._userService.signInUser(loginData)
      .then(
        (res) => {
          console.log(res)
          this.invalidPassword = false;
          this.userDNE = false;
          this._router.navigate(['/products']) //User successfully signed in, go to homepage
        }
      )
      .catch(
        (err) => {
          console.log(err.error)
          if (err.error == 'Invalid password') {
            this.userDNE = false;
            this.invalidPassword = true;
          }
          if (err.error == 'User does not exist') {
            this.invalidPassword = false;
            this.userDNE = true;
          }
        }
      )
      
      //Form is valid, submit to server
      //code here
    }
  }
}

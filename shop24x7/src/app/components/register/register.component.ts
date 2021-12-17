import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  signUpForm : FormGroup = this._formBuilder.group({});
  passwordsMatch: boolean = true;
  constructor(private _formBuilder : FormBuilder, private http: HttpClient) { 
  }

  ngOnInit(): void {
    
    this.signUpForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    })
  }

  get f() {
    return this.signUpForm.controls;
  }
  checkRequiredValidation(control: string) {
    return this.f[control].errors?.['required'];
  }

  checkEmailFormat(control: string) {
    return this.f[control].errors?.['email'];
  }

  checkMinLength(control: string) {
    return this.f[control].errors?.['minlength'];
  }
  
  checkMaxLength(control: string) {
    return this.f[control].errors?.['maxlength'];
  }

  checkMustMatchValidation(control: string) {
    return this.f[control].errors?.['mustMatch'];
  }
  onFormSubmit() {
    this.submitted = true;
    if(this.signUpForm.value.password != this.signUpForm.value.confirmPassword) {
      this.passwordsMatch = false
    }

    if (this.signUpForm.invalid) {
      //Form was filled out incorrectly, so do not submit to server
      const invalid = [];
        const controls = this.signUpForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
      
      console.log("invalid: " + invalid);
      return;
    }
    else {
      var newMongoUser = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };
      console.log("body to be sent to backend\n" + JSON.stringify(newMongoUser))
      // console.log("about to call API")
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
      this.http.post('http://localhost:3000/registerUser', JSON.stringify(newMongoUser), {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
      //Form is valid, submit to server
      //code here
    }
  }

}


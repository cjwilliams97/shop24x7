import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any;
  submitted = false;
  orderForm: FormGroup = this._formBuilder.group({});
  constructor(private _cartService : CartService, private _router: Router, private _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.cart = this._cartService.getCart();
    this.orderForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    })
  }

  get f() {
    return this.orderForm.controls;
  }
  checkRequiredValidation(control: string) {
    return this.f[control].errors?.['required'];
  }
  checkEmailValidation(control: string) {
    return this.f[control].errors?.['email'];
  }
  submitOrder() {
    this.submitted = true;
  }

}

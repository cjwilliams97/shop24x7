import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any;
  submitted = false;
  orderForm: FormGroup = this._formBuilder.group({});
  constructor(private _cartService : CartService, private _router: Router, private _formBuilder : FormBuilder, private _orderService: OrderService) { }

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
  //submit order using order service
  submitOrder() {
    this.submitted = true;
    this.cart = this._cartService.getCart;
    this._orderService.submitOrder()
    .then (
      (res) => {
        this._router.navigate(['orders']);
      }
    )
    .catch (
      (error) => {
        console.log(error.error)
      }
    );
    
  }

}

import { Injectable } from '@angular/core';
import {cart} from '../interfaces/cart'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart : cart = {
    isEmpty: false,
    cartItems: [
      {
        product: {
          name: "iPhone",
          description: "64GB",
          price: 799,
          discount: 0
        },
        quantity: 2
      },
      {
        product: {
          name: "iMac",
          description: "512GB",
          price: 1399,
          discount: 0
        },
        quantity: 3
      },
      {
        product: {
          name: "iPad",
          description: "512GB",
          price: 999,
          discount: 300
        },
        quantity: 9
      }
    ]
  }
  constructor() { }

  getCart() {
    return this.cart
  }
  addToCart() {
    this.cart.isEmpty = false;
  }
}

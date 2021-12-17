import { Injectable } from '@angular/core';
import {cartItem} from '../interfaces/cartItem'
import { product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart : cartItem[] = [
    {
      product: {
        id: '1',
        name: "iPhone",
        description: "64GB",
        price: 799,
        discount: 0
      },
      quantity: 2
    },
    {
      product: {
        id: '2',
        name: "iMac",
        description: "512GB",
        price: 1399,
        discount: 0
      },
      quantity: 3
    },
    {
      product: {
        id: '3',
        name: "iPad",
        description: "512GB",
        price: 999,
        discount: 300
      },
      quantity: 9
      }
  ]
  constructor() { }

  getCart() {
    return this.cart
  }
  clearCart() {
    this.cart = []
  }
  addToCart(item : product, quantity: number) {
    const existingItem = this.cart.find((cartItem) => { cartItem.product.id == item.id})
    if (existingItem != undefined) {
      existingItem.quantity += quantity;
    }
    else {
      this.cart.push({product: item, quantity: quantity});
    }
    
  }
  calculateTotal() {
    var total = 0;
    for (let item of this.cart) {
      total = total + ((item.product.price * item.quantity) - (item.product.discount * item.quantity))
    }
    return total;
  }
  
}

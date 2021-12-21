import { Injectable } from '@angular/core';
import { cartItem } from '../interfaces/cartItem';
import { order } from '../interfaces/order';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderList: order[] = [
    {
      _id: '102',
      userId: '1004',
      userEmail: 'email@tcs.com',
      cart: [
        {
          product: {
            id: '123123',
            name: 'iPhone',
            description: '64GB',
            price: 998,
            discount: 0
          },
          quantity: 2
        },
        {
          product: {
            id: '12323',
            name: 'iPad',
            description: '256GB',
            price: 599,
            discount: 0
          },
          quantity: 5
        }
      ],
      orderTotal: 98756,
      date: '12/15/2021',
      delivered: true
    },
    {
      _id: '102',
      userId: '1004',
      userEmail: 'email@tcs.com',
      cart: [
        {
          product: {
            id: '123123',
            name: 'Apple Watch',
            description: '64GB',
            price: 9958,
            discount: 0
          },
          quantity: 2
        },
        {
          product: {
            id: '12323',
            name: 'iPad',
            description: '256GB',
            price: 599,
            discount: 0
          },
          quantity: 5
        }
      ],
      orderTotal: 98756,
      date: '12/15/2021',
      delivered: true
    }
  ]
  AdminOrderList: order[] = [
    {
      _id: '102',
      userId: '1004',
      userEmail: 'email@tcs.com',
      cart: [
        {
          product: {
            id: '1123653',
            name: 'iPhone6',
            description: '644GB',
            price: 9958,
            discount: 0
          },
          quantity: 1
        },
        {
          product: {
            id: '126543',
            name: 'iPadffd',
            description: '152GB',
            price: 6598,
            discount: 0
          },
          quantity: 5
        }
      ],
      orderTotal: 98756,
      date: '12/15/2021',
      delivered: true
    },
    {
      _id: '102',
      userId: '1004',
      userEmail: 'email@tcs.com',
      cart: [
        {
          product: {
            id: '123123',
            name: 'iPhone',
            description: '64GB',
            price: 998,
            discount: 0
          },
          quantity: 2
        },
        {
          product: {
            id: '12323',
            name: 'iPad',
            description: '256GB',
            price: 599,
            discount: 0
          },
          quantity: 5
        }
      ],
      orderTotal: 98756,
      date: '12/15/2021',
      delivered: true
    },
    {
      _id: '103',
      userId: '1007',
      userEmail: 'email@tcs.com',
      cart: [
        {
          product: {
            id: '123123',
            name: 'iPhone',
            description: '64GB',
            price: 998,
            discount: 0
          },
          quantity: 2
        },
        {
          product: {
            id: '1231323',
            name: 'iMac',
            description: '500GB',
            price: 1299,
            discount: 0
          },
          quantity: 2
        }
      ],
      orderTotal: 98756,
      date: '12/15/2021',
      delivered: true
    }
  ]
  userData: any;
  cart: any;
  constructor(private _userService : UserService, private _cartService : CartService, private _router: Router, private http : HttpClient) { }
  getUserOrdersList() {
    //return this.orderList;
    return new Promise ((resolve, reject) => {
      this.userData = this._userService.getCurrentUser();
      const token = this._userService.getToken()
      var headers = new HttpHeaders({'Authorization': 'Bearer ' + token})
      this.http.get('http://localhost:3000/getOrdersForId', {headers: headers})
      .subscribe ( 
        (res : any) => {
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
      
    })
  }
  getAdminOrdersList() {
    //return this.AdminOrderList;
    return new Promise ((resolve, reject) => {
      this.userData = this._userService.getCurrentUser();
      const token = this._userService.getToken()
      var headers = new HttpHeaders({'Authorization': 'Bearer ' + token})
      this.http.get('http://localhost:3000/getAllOrders', {headers: headers})
      .subscribe ( 
        (res : any) => {
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
      
    })
  }
  submitOrder() {
    //submit order to database
    return new Promise ((resolve, reject) => {
      this.userData = this._userService.getCurrentUser();
      var newOrder: order = {
        _id: '0',
        userId: this.userData._id,
        userEmail: this.userData.email,
        cart: this._cartService.getCart(),
        orderTotal: this._cartService.calculateTotal(),
        date: Date(),
        delivered: false
      }
      const token = this._userService.getToken()
      var headers = new HttpHeaders({'Authorization': 'Bearer ' + token})
      this.http.post('http://localhost:3000/submitOrder', newOrder, {headers: headers})
      .subscribe ( 
        (res : any) => {
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
      
    })

  }
  processOrderById(_id : any) {
    return new Promise ((resolve, reject) => {
      const httpParams = {orderId: _id}
      const token = this._userService.getToken()
      var headers = new HttpHeaders({'Authorization': 'Bearer ' + token})
      this.http.post('http://localhost:3000/processOrderById', httpParams, {headers: headers})
      .subscribe( 
        (res) => {
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
  deleteOrderById(_id : any) {
    return new Promise ((resolve, reject) => {
      const httpParams = {orderId: _id}
      const token = this._userService.getToken()
      var headers = new HttpHeaders({'Authorization': 'Bearer ' + token})
      this.http.post('http://localhost:3000/deleteOrderById', httpParams, {headers: headers})
      .subscribe( 
        (res) => {
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
}

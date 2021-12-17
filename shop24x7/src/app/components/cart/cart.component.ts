import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private _cartService : CartService, private _router: Router) { }

  cart : any;
  total : number = 0;
  ngOnInit(): void {
    this.cart = this._cartService.getCart();
    this.calculateTotal();
  }
  ngOnChanges(changes: SimpleChanges) : void {
    this.calculateTotal();
  }

  removeFromCart(item : any) {
    this.cart.forEach((element:any,index: any)=>{
      if(element.product.name == item.product.name) this.cart.splice(index,1);
   });
  }
  calculateTotal() {
    var total = 0;
    for (let item of this.cart) {
      total = total + ((item.product.price * item.quantity) - (item.product.discount * item.quantity))
    }
    this.total = total;
  }
  checkoutButtonClick() {
    this._router.navigate(['checkout'])
  }
}

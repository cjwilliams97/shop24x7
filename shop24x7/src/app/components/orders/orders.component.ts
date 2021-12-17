import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { UndeliveredOrdersPipe } from 'src/app/pipes/undelivered-orders.pipe';
import { DeliveredOrdersPipe } from 'src/app/pipes/delivered-orders.pipe';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userInfo: any
  userOrdersList: any;
  adminOrdersList: any;
  constructor(private _userService: UserService, private _orderService: OrderService) { }

  ngOnInit(): void {
    this.userInfo = this._userService.getCurrentUser();
    console.log(this.userInfo.roleId)
    if (this.userInfo.roleId=='administrator') {
      this._orderService.getAdminOrdersList()
      .then(
        (res) => {
          this.adminOrdersList = res;
        }
      )
    }
    else { //user is a normal user
      //this.adminOrdersList = this._orderService.getAdminOrdersList();
      this._orderService.getUserOrdersList()
      .then(
        (res) => {
          console.log(res)
          this.userOrdersList = res;
        }
      )
    }  
  }
  processClicked(_id: any) {
    this.adminOrdersList.forEach((element:any,index: any)=>{
      if(element._id == _id) this.adminOrdersList[index].delivered = true;
   });
  }
  deleteClicked(_id: any) {
    this.adminOrdersList.forEach((element:any,index: any)=>{
      if(element._id == _id) this.adminOrdersList.splice(index,1);
   });
  }

}

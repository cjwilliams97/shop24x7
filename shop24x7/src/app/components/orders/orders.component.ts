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
  userOrdersList: any = [];
  adminOrdersList: any = [];
  constructor(private _userService: UserService, private _orderService: OrderService) { }

  ngOnInit(): void {
    this.userInfo = this._userService.getCurrentUser();
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
          this.userOrdersList = res;
        }
      )
    }  
  }
  processClicked(_id: any) {
    
   this._orderService.processOrderById(_id)
   .then ( 
      (res) => {
        console.log(res)
        this.adminOrdersList.forEach((element:any,index: any)=>{
          if(element._id == _id) this.adminOrdersList[index].delivered = true;
       });
      })
    .catch (
      (error) => {
        console.log(error)
      }
    )
  }
  deleteClicked(_id: any) {
    
    this._orderService.deleteOrderById(_id)
    .then (
      (res) => {
        console.log(res)
        this.adminOrdersList.forEach((element:any,index: any)=>{
          if(element._id == _id) this.adminOrdersList.splice(index,1);
        })
      }
    )
    .catch ( 
      (error) => {
        console.log(error.error)
      }
    )
  }
    


}

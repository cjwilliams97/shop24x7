import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { CartComponent } from './components/cart/cart.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'userprofile',
    component: UserprofileComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
  
]

//export class AppRoutingModule { }
export const routingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes);
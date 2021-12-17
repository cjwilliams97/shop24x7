import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { CartComponent } from './components/cart/cart.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
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
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: '',
    //redirectTo: '/homepage',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productDetails/:prodId',
    component: ProductDetailsComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  }
  
]

//export class AppRoutingModule { }
export const routingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes);
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routting.module';
import { ProductIndexComponent } from './product-index/product-index.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartShowComponent } from '../cart/cart-show/cart-show.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    
  ],
  declarations: [ProductListComponent, ProductDetailComponent,ProductIndexComponent,CartShowComponent],
  providers: [ ProductsService],

})
export class ProductsModule { }

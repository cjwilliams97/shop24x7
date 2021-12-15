import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductIndexComponent } from './product-index/product-index.component';



const routes: Routes = [
  
    {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: '',
        component: ProductIndexComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

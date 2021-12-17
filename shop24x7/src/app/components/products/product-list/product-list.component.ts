import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { product } from 'src/app/interfaces/product'
import { ProductService } from 'src/app/services/products.service'

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
//retrieves a list of products
export class ProductListComponent implements OnInit {
   products: product[] = [
       {
           id: '100',
           name: 'testProd',
           description: 'testDesc',
           price: 1299,
           discount: 0
       },
       {
        id: '123123',
        name: 'iPhone',
        description: '64GB',
        price: 998,
        discount: 0
       }
   ]
//gets the product list from the ProductService
    constructor(private _productService: ProductService, private _router: Router) { }

    ngOnInit(): void {
        this._productService.getProductList();
    }
    viewProdDetails(prod: product) {
        this._router.navigate(['/productDetails', prod.id])
    }
}
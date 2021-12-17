import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from 'src/app/services/products.service'
import { product } from 'src/app/interfaces/product'
import { Input } from '@angular/core'
@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
	public id: string = ''
	selectedProduct: any
	@Input() 
	prod: any;

	/*products: product[] = [{
        id: '123123',
        name: 'iPhone',
        description: '64GB',
        price: 998,
        discount: 0
        }]*/

		//retrieves a product by ID
	constructor(public productService: ProductService, public _activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		let prodId = this._activatedRoute.snapshot.paramMap.get('prodId')?.toString();
		this.prod = this.productService.getProductsById(prodId)
	  }

	//updates a product
	  async updateProduct(product: product) {
		if (this.selectedProduct.id !== undefined) {
		  await this.productService.updateProduct(this.selectedProduct);
		} else {
		  await this.productService.createProduct(this.selectedProduct);
		}

	  }

	//edits a product
	  editProduct(product: product) {
		this.selectedProduct = product;
	  }

	//Work in progress new product creation
	  clearProduct() {
	  }
	
	  //deletes a product
	  async deleteProduct(product: product) {
		if (confirm(`Are you sure you want to delete the product ${product.name}. This cannot be undone.`)) {
		  await this.productService.deleteProduct(product.id);
		}

	  }
}
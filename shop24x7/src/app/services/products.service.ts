import { Injectable } from '@angular/core';
import { product } from '../interfaces/product';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
  
//Admin update, create, and delete features
    updateProduct( product: any) {

    }
    createProduct(product: any) {

    }
    deleteProduct(product: any) {

    }
    //retrieves the ProductList for the Product List page
   productList: product[] = [
       {
        id: '123123',
        name: 'iPhone',
        description: '64GB',
        price: 998,
        discount: 0
       },
       
       {
        id: '12323',
        name: 'iPad',
        description: '256GB',
        price: 599,
        discount: 0
      },

      {
        id: '123123',
        name: 'Apple Watch',
        description: '64GB',
        price: 9958,
        discount: 0
      },

      {
        id: '1123653',
        name: 'iPhone6',
        description: '644GB',
        price: 9958,
        discount: 0
      },

      {
        id: '126543',
        name: 'iPadffd',
        description: '152GB',
        price: 6598,
        discount: 0
      },

      {
        id: '1231323',
        name: 'iMac',
        description: '500GB',
        price: 1299,
        discount: 0
      }
   ]
   getProductList() {
     return this.productList;
   }
   //retrieves the products by ID for the product details
   getProductsById(id: any) {
    const foundProduct = this.productList.find((prod) => {
      prod.id == id
    })
    if (foundProduct != undefined) 
      return foundProduct;
    return
  }
   /*constructor(public product: ProductService, private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {
    const token = await this.product.getAccessToken();

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getProducts() {
    return this.request('get', `${baseUrl}/product`);
  }

  getProduct(id: string) {
    return this.request('get', `${baseUrl}/product/${id}`);
  }

  createProduct(product: products) {
    console.log('createProduct ' + JSON.stringify(product));
    return this.request('post', `${baseUrl}/product`, product);
  }

  updateProduct(product: products) {
    console.log('updateProduct ' + JSON.stringify(product));
    return this.request('post', `${baseUrl}/product/${product.id}`, product);
  }

  deleteProduct(id: string) {
    return this.request('delete', `${baseUrl}/product/${id}`, null, 'text');
  }*/
}

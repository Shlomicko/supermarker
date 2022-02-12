import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../../../../../../Share/Product';

import { ITrolleyItem } from '../../../../../../Share/trolleyItem';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
@Injectable({
  providedIn: 'root',
})
export class TrollyProductsService {
  constructor(private http: HttpClient) {}
  readonly listProductUrl = 'http://localhost:3000/api/store';

  getAllListOfProductByCustomerId(
    cartRef: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.listProductUrl}/list-trolly/${cartRef}`
    );
  }

  deleteProductFromShoppingCart(
   
    _id: string
  ) {
    return this.http.delete<string>(
      `${this.listProductUrl}/delete-cart-item/${_id}`,
   
    );
  }

  addProductToTrolleyItem(
    payload: ITrolleyItem
  ): Observable<Product> {
    console.log({payload});
    
    return this.http.post<Product>(
      `${this.listProductUrl}/add-single-item-to-cart`,
      payload,
      { headers }
    );
  }
  deleteAllItemFromShoppingCartApi(cartRef: string) {
    return this.http.delete(
      `${this.listProductUrl}/delete-all-trolly-items/${cartRef}`
    );
  }
  updateAmountTrollyItem(
    idTrollyItem: string,
    quantity: number
  ): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.listProductUrl}/update-amount-product/${idTrollyItem}`,
      { quantity }
    );
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Shopping } from '../../../state/reducers/index';
import * as shoppingActions from '../../../state/selectors/shopping-selectors';
import { IShoppingCart } from '../../../../../../Share/shoppingCart';
import { map, Observable } from 'rxjs';
import { IShoppingCartDetails } from '../../../../../../Share/shoppingCartDetails';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  readonly api_url = 'http://localhost:3000/api/store';
  constructor(private http: HttpClient) {}

  getShoppingCartForCustomer(
    customerRef: string
  ): Observable<IShoppingCartDetails> {
    console.log(customerRef);

    return this.http.get<IShoppingCartDetails>(
      `${this.api_url}/get-shopping-cart/${customerRef}`
    );
  }

  createNewShoppingCartForCustomer(
    customerRef: string
  ): Observable<IShoppingCart> {
    console.log(customerRef, 'create shopping cart for customer');

    return this.http.post<IShoppingCart>(`${this.api_url}/new-shopping-cart`, {
      customerRef,
    });
  }
  initializeCartAndListCart(
    cartRef: string,
    customerRef: string
  ): Observable<IShoppingCart> {
    return this.http.post<IShoppingCart>(
      `${this.api_url}/initial-cart-with-empty-cart`,
      { cartRef, customerRef }
    );
  }
}

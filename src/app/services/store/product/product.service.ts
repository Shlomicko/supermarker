import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';

import { Categories } from '../../../../../../Share/categories';
import { IProduct } from '../../../../../../Share/Products';
import * as shoppingActions from '../../../state/actions/shopping.actions';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly url_api: string = 'http://localhost:3000/api/store';
  constructor(private http: HttpClient, private store: Store) {}

  fetchAllCategory(): Observable<Categories[]> {
    return this.http.get<Categories[]>(
      `http://localhost:3000/api/store/category`
    );
  }

  getAllProductByCategoryId(categoryId: string): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(
      `${this.url_api}/category/${categoryId}`,
      {}
    );
  }

  getProductsByName(str: string): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.url_api}/search/name`, {
      name: str,
    });
  }
  totalOfProductInDB(): Observable<{ quantityOfProducts: number }> {
    return this.http.get<{ quantityOfProducts: number }>(
      `${this.url_api}/all-product-available`
    );
  }
}

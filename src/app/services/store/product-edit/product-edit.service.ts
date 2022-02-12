import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../../../../../Share/Products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductEditService {
  constructor(private http: HttpClient) {}
  readonly api_edit_product = 'http://localhost:3000/api/store/edit-product';
  editProduct(product: IProduct) {
    return this.http.patch<IProduct>(`${this.api_edit_product}`, product);
  }

  
}

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../../../../../../Share/Products';
import * as productAction from '../../../state/actions/shopping.actions';
@Component({
  selector: 'app-manager-options',
  templateUrl: './manager-options.component.html',
  styleUrls: ['./manager-options.component.css'],
})
export class ManagerOptionsComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() product!: IProduct;
  ngOnInit(): void {}


  editProduct(product: IProduct) {

 
    
    this.store.dispatch(productAction.productEditByAdminInit({product}));
  }
}

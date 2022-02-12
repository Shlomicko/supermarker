import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../../../../../../Share/Product';
import { Shopping } from '../../../state/reducers/index';
import * as shoppingAction from '../../../state/selectors/shopping-selectors';
@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.css'],
})
export class ListCartComponent implements OnInit {
  getListCart: Subscription;
  constructor(private store: Store<Shopping>) {}
  listProduct: Product[] = [];
  dataSource=[];
  displayedColumns = ["name",' ', 'cost','quantity'];
  ngOnInit(): void {
    this.getListCart = this.store
      .select(shoppingAction.selectListsItemOfProducts)
      .subscribe((listProduct) => {
        if (listProduct) {
          this.listProduct = listProduct;
          this.dataSource = this.listProductNormalized();
        }
      });
  }

  listProductNormalized() {
    const newItem = this.listProduct.map((item) => {
      return {
        name: item.name,
        totalPrice: item.price * item.quantity,
        picture: item.imgUrl,
        category: item.categoryRef,
        price: item.price,
        quantity: item.quantity,
      };
    });
    return newItem
  }

  getTotalCost() {
    return this.listProduct
      .map((item) => item.price)
      .reduce((acc, value) => acc + value, 0);
  }
  sumAllQuantity() {
    return this.listProduct
      .map((item) => item.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  onDestroy() {
    this.getListCart.unsubscribe();
  }
}

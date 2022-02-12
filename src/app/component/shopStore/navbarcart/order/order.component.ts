import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Shopping } from '../../../../state/reducers/index';
import * as selectorShopping from '../../../../state/selectors/shopping-selectors';
import * as actionShopping from '../../../../state/actions/shopping.actions';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private store: Store<Shopping>) {}
  fetchCity = this.store.select(selectorShopping.selectCities);
  ngOnInit(): void {
  
   
  }
}

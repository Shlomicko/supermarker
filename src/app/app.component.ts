import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as shoppingCartAction from '../../src/app/state/actions/shopping.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(
      shoppingCartAction.getAllProductsByIdShoppingCartInit({
        cartRef: '61f4e5179380ba9698e31e68',
      })
    );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Shopping } from '../../state/reducers/index';
import * as shoppingAction from '../../state/actions/shopping.actions';
import * as shoppingSelect from '../../state/selectors/shopping-selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-door',
  templateUrl: './front-door.component.html',
  styleUrls: ['./front-door.component.css'],
})
export class FrontDoorComponent implements OnInit {
  getCustomerDetails$: Subscription;

  getCustomerDetails: {
    cartRef: string;
    customerRef: string;
  };

  constructor(private store: Store<Shopping>, private router: Router) {}

  ngOnInit(): void {
    this.getCustomerDetails$ = this.store
      .select(shoppingSelect.selectShoppingCartDetails)
      .subscribe((response) => {
        if (response) {
          this.getCustomerDetails = {
            cartRef: response.id,
            customerRef: response.customerRef,
          };
        }
      });
  }
  getEmptyCart() {
    this.store.dispatch(
      shoppingAction.initializeCartAndListCartInit({
        cartRef: this.getCustomerDetails.cartRef,
        customerRef: this.getCustomerDetails.customerRef,
      })
    );
    this.router.navigate(['/store']);
  }
  onPreviousCart(){
    this.router.navigate(['/store']);
  }
  OnDestroy() {
    this.getCustomerDetails$.unsubscribe();
  }
}

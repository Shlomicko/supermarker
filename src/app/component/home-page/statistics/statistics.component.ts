import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shopping } from '../../../state/reducers/index';
import * as shoppingActions from '../../../state/actions/shopping.actions';
import * as shoppingSelector from '../../../state/selectors/shopping-selectors';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  quantityOfProducts:number
  constructor(private store: Store<Shopping>) {}

  ngOnInit(): void {
    this.store.dispatch(shoppingActions.indicationOfQuantityOfProductsInit());
   this.store.select(shoppingSelector.quantityOfProducts).subscribe((quantity) => {
     this.quantityOfProducts = quantity
   });
  }
}

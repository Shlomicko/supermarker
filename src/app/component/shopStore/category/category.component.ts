import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IProduct } from '../../../../../../Share/Products';

import { CategoryService } from '../../../services/store/product/product.service';
import { Shopping } from '../../../state/reducers/index';
import * as ShoppingSelectors from '../../../state/selectors/shopping-selectors';
import * as shoppingActions from '../../../state/actions/shopping.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public categories$? = this.store.select(ShoppingSelectors.selectCategories);

  public loading$ = this.store.select(ShoppingSelectors.selectLoading);

  constructor(private router: Router, private store: Store<Shopping>) {}
  product = new FormControl('');
  ngOnInit(): void {
    this.store.dispatch(shoppingActions.fetchCategories());
 
  }

  SearchProductByName(str: string) {
    if (str)
      this.store.dispatch(shoppingActions.fetchSingleProductsBySearch({ str }));
    this.router.navigate(['/store']);
  }
}

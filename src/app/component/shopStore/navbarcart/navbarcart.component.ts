import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Shopping } from 'src/app/state/reducers';

import * as ShoppingSelectors from '../../../state/selectors/shopping-selectors';

import * as shoppingAction from '../../../state/actions/shopping.actions';
import { Observable, map, mapTo } from 'rxjs';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Product } from '../../../../../../Share/Product';

@Component({
  selector: 'app-navbarcart',
  templateUrl: './navbarcart.component.html',
  styleUrls: ['./navbarcart.component.css'],
})
export class NavbarcartComponent implements OnInit, OnChanges {
  public itemsForm!: FormGroup;
  trollyItems: Observable<Product[] | null | undefined> = this.store.select(
    ShoppingSelectors.selectProductOfTrollyItems
  );

  constructor(
    private store: Store<Shopping>,
    private readonly fb: FormBuilder
  ) {}

  valueAmount: FormControl = new FormControl(0);
  cartRef: string | undefined;
  ngOnInit(): void {
    this.store
      .select(ShoppingSelectors.selectShoppingCartDetails)
      .subscribe((details) => {
        if (details?.customerRef) {
          this.cartRef = details.id;
          return this.fetchTrollyItem(details?.id);
        }
      });

    this.store
      .select(ShoppingSelectors.selectProductOfTrollyItems)
      .pipe()
      .subscribe((items: Product[]) => {
        this.buildForm(items);
      });
  }
  ngOnChanges(): void {}

  private buildForm(items: Product[]): void {
    const itemControls = items.map((item) =>
      this.fb.group({
        id: [item.id],
        name: [item.name],
        price: [item.price],
        amount: [item.quantity],
        img: [item.imgUrl],
        description: [item.description],
        cartRef: [item.cartRef],
        categoryRef: [item.categoryRef],
      })
    );
    this.itemsForm = this.fb.group({ items: this.fb.array(itemControls) });
    console.log('buildForm', this.items?.controls);
    this.items.controls.forEach((item) => {
      console.log('in loop', item);
    });
  }

  public get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  fetchTrollyItem(cartRef: string) {
    this.store.dispatch(
      shoppingAction.getAllProductsByIdShoppingCartInit({ cartRef })
    );
  }

  deleteTrollyItem(_id: string) {
    this.store.dispatch(
      shoppingAction.deleteProductBy_IdTrollyInit({
        _id
      })
    );
  }

  deleteAllTrollyItems(cartRef?: string) {
    if (cartRef) {
      this.store.dispatch(
        shoppingAction.deleteAllItemFromShoppingCartInit({ cartRef })
      );
    }
  }

  handelChangeAmount(trollyItem:Product,idTrollyItem: string, quantity: string) {
    console.log({idTrollyItem});
    
    const toNumber = Number(quantity);
    this.store.dispatch(shoppingAction.updateAmountTrollySuccess({trolleyProductItem: trollyItem}))
  }
}

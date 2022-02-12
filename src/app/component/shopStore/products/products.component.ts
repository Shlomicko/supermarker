import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRoute, Params } from '@angular/router';
import * as ShoppingSelectors from '../../../state/selectors/shopping-selectors';
import { Shopping } from 'src/app/state/reducers';
import { IProduct } from '../../../../../../Share/Products';

import * as productAction from '../../../state/actions/shopping.actions';
import { MatDialog } from '@angular/material/dialog';

import { ITrolleyItem } from '../../../../../../Share/trolleyItem';
import { FormAddToCartComponent } from '../navbarcart/form-add-to-cart/form-add-to-cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products$!: IProduct[] | null;
 

  public infoAuth$?: boolean = false;
  shoppingCardId!: string;

  private currentCategoryId!: string;

  constructor(
    private store: Store<Shopping>,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  openDialog(product: IProduct) {
    const dialogRef = this.dialog.open(FormAddToCartComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const [quantity, product] = result;
      console.log(product,"in modal");

      const { id }: IProduct = product;
      const trolleyItem: ITrolleyItem = {
        productRef: id!,
        quantity,
        cartRef: this.shoppingCardId,
      };

      this.store.dispatch(
        productAction.addProductToTrollyItemInit({ trolleyItem })
      );
    });
  }

  ngOnInit(): void {
    this.store
      .select(ShoppingSelectors.selectProducts)
      .subscribe((products) => {
        this.products$ = products;
      });
    this.getParamsOfCategoryId();
    this.store
      .select(ShoppingSelectors.selectLoginInformation)
      .subscribe((infoLogin) => {
        if (infoLogin) {
          this.infoAuth$ = infoLogin.isAdmin;
        }
      });

    this.store
      .select(ShoppingSelectors.selectShoppingCartDetails)
      .subscribe((shoppingCartRef) => {
        if (shoppingCartRef) this.shoppingCardId = shoppingCartRef?.id;
        console.log(this.shoppingCardId);
      });

    this.store
      .select(ShoppingSelectors.selectProductEditByAdmin)
      .subscribe((product) => {
        if (product) {
          this.fetchProductsByCategoryId(product.categoryRef);
        }
      });
  }

  getParamsOfCategoryId() {
    this.route.params.subscribe((params: Params) => {
      if (params['categoryRef']) {
        this.currentCategoryId = params['categoryRef'];
        this.fetchProductsByCategoryId(this.currentCategoryId);
      }
    });
  }

  fetchProductsByCategoryId(categoryId: string): void {
    if (this.currentCategoryId) {
      this.store.dispatch(productAction.fetchProductsInit({ categoryId }));
    }
  }

  updateAmountByCustomer(idTrollyItem: string, quantity: number): void {
    this.store.dispatch(
      productAction.updateAmountTrollyItemInit({ idTrollyItem, quantity })
    );
  }
}

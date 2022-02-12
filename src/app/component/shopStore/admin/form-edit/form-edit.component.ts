import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { from, Observable, Subject, takeUntil } from 'rxjs';
import { Categories } from '../../../../../../../Share/categories';
import { IProduct } from '../../../../../../../Share/Products';
import { Shopping } from '../../../../state/reducers/index';
import * as productSelect from '../../../../state/selectors/shopping-selectors';
import * as productAction from '../../../../state/actions/shopping.actions';
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit, OnDestroy {
  singleProductEdit$?: IProduct;
  private readonly unSubscriber$ = new Subject<void>();
  public categories$?: Observable<Categories[] | null> = this.store.select(
    productSelect.selectCategories
  );

  public editFormHandel!: FormGroup;
  constructor(private store: Store<Shopping>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store
      .select(productSelect.selectProductEditByAdmin)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((product) => {
        if (product) {
          this.singleProductEdit$ = product;
          this.createForm();
          
          
        }
      });
  }

  public get categoryId(): string {
    return this.editFormHandel.get('categoryRef')?.value;
  }

  private createForm(): void {
    this.editFormHandel = this.fb.group({
      id: [this.singleProductEdit$?.id],
      name: [this.singleProductEdit$?.name],
      categoryRef: [this.singleProductEdit$?.categoryRef],
      price: [this.singleProductEdit$?.price],
      imgUrl: [this.singleProductEdit$?.imgUrl],
      description: [this.singleProductEdit$?.description],
    });
  }

  onSave(idProduct?: string): void {
    const editedProduct = this.editFormHandel.value as IProduct;
 

    if (editedProduct) {
      this.store.dispatch(
        productAction.productEditByAdminSuccess({ product: editedProduct })
      );
    }
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}

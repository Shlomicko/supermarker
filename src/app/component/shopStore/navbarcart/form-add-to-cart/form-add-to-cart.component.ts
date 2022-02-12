import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { IProduct } from '../../../../../../../Share/Products';
@Component({
  selector: 'app-form-add-to-cart',
  templateUrl: './form-add-to-cart.component.html',
  styleUrls: ['./form-add-to-cart.component.css'],
})
export class FormAddToCartComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormAddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public product: IProduct
  ) {}

  amountControl: number = 1;

  ngOnInit(): void {
    console.log(this.product);
    
  }
  save(product: IProduct) {

    this.dialogRef.close([this.amountControl, product]);
  }
  increment() {
    this.amountControl++;
  }

  decrement() {
    if (this.amountControl === 1) return;
    this.amountControl--;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { NavbarcartComponent } from './navbarcart/navbarcart.component';
import { FormAddToCartComponent } from './navbarcart/form-add-to-cart/form-add-to-cart.component';
import { OrderFormComponent } from './navbarcart/order/order-form/order-form.component';
import { OrderComponent } from '../order/order.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'category/:categoryRef', component: CategoryComponent },
];

@NgModule({
  declarations: [
    CategoryComponent,
    NavbarcartComponent,
    FormAddToCartComponent,
    OrderFormComponent,
    OrderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ShopModule {}

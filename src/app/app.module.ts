import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from './state/reducers';
import { ShoppingEffects } from './state/effects/ShoppingStoreEffect';
import { AuthEffects } from './state/effects/auth-effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './component/userAuth/login/login.component';
import { CategoryComponent } from './component/shopStore/category/category.component';
import { ProductsComponent } from './component/shopStore/products/products.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NavbarcartComponent } from './component/shopStore/navbarcart/navbarcart.component';
import { RegistrationComponent } from './component/userAuth/registration/registration.component';
import { ManagerOptionsComponent } from './component/shopStore/admin/manager-options.component';
import { FormEditComponent } from './component/shopStore/admin/form-edit/form-edit.component';
import { FormNewProductComponent } from './component/shopStore/admin/form-new-product/form-new-product.component';
import { FormAddToCartComponent } from './component/shopStore/navbarcart/form-add-to-cart/form-add-to-cart.component';
import { OrderComponent } from './component/order/order.component';
import { OrderFormComponent } from './component/shopStore/navbarcart/order/order-form/order-form.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AboutComponent } from './component/home-page/about/about.component';
import { StatisticsComponent } from './component/home-page/statistics/statistics.component';
import { FrontDoorComponent } from './component/front-door/front-door.component';
import { ListCartComponent } from './component/order/list-cart/list-cart.component';


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    CategoryComponent,
    ProductsComponent,

    NavbarComponent,
    NavbarcartComponent,

    RegistrationComponent,
    ManagerOptionsComponent,
    FormEditComponent,
    FormNewProductComponent,
    FormAddToCartComponent,

    OrderComponent,
    OrderFormComponent,
    HomePageComponent,
    AboutComponent,
    StatisticsComponent,
    FrontDoorComponent,
    ListCartComponent,
  ],
  entryComponents: [FormAddToCartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ shoppingFeature: shoppingReducer }),
    EffectsModule.forRoot([AuthEffects, ShoppingEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Shopping } from 'src/app/state/reducers';
import * as ShoppingSelectors from '../../../state/selectors/shopping-selectors';
import { loginInit } from '../../../state/actions/user.actions';
import * as shoppingCartAction from '../../../state/actions/shopping.actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  flag: boolean = true;
  constructor(private store: Store<Shopping>, private router: Router) {}
  hide = false;
  isLoading = this.store.select(ShoppingSelectors.selectLoading) || false;
  loginInformation: Subscription;
  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('1', [Validators.required]),
    password: new FormControl('1', [Validators.required]),
  });
  async onSubmit() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(loginInit({ userName: email, password }));
    this.loginInformation = this.store
      .select(ShoppingSelectors.selectLoginInformation)
      .subscribe((result) => {
        console.log({ result });
        if (result) {
          this.store.dispatch(
            shoppingCartAction.getAndCheckShoppingCartCustomerInit({
              customerRef: result.userId,
            })
          );
          this.store
            .select(ShoppingSelectors.selectProductOfTrollyItems)
            .subscribe((listItem) => {
              console.log(listItem.length);

              if (listItem.length && this.flag) {
                this.router.navigate(['front-door']);
                this.flag = false;
              } else {
                this.router.navigate(['/store']);
              }
            });
        }
      });
  }
  OnDestroy() {
    this.loginInformation.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password?.hasError('minlength')
      ? 'Password must be at least 8 digits'
      : '';
  }
}

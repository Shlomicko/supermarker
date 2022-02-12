import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import * as ShoppingSelectors from '../../../state/selectors/shopping-selectors';
import { Shopping } from '../../../state/reducers/index';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { Store } from '@ngrx/store';
import * as userRegistrationAction from '../../../state/actions/user.actions';
import { IUser } from '../../../../../../Share/users';
import * as shoppingAction from '../../../state/actions/shopping.actions';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  isFullRegister: boolean | null = false;
  userAuth: Subscription;
  denialOfRegistration: Subscription;
  @ViewChild('stepper') stepper!: MatStepper;

  public cities = this.store.select(ShoppingSelectors.selectCities);
  constructor(
    private fb: FormBuilder,

    private store: Store<Shopping>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(shoppingAction.fetchCities());
    this.store
      .select(ShoppingSelectors.selectLoginInformation)
      .subscribe((data) => {
        if (data) this.stepper.next();
      });

    this.store
      .select(ShoppingSelectors.selectIsRegistered)
      .subscribe((isCanRegister) => {
        this.isFullRegister = isCanRegister;
        if (this.isFullRegister) {
          this.stepper.next();
        }
      });
  }

  checkRegisterForm = this.fb.group(
    {
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.confirmedValidator('password', 'confirmPassword') }
  );

  finalRegisterForm = this.fb.group({
    city: ['', Validators.required],
    address: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  checkBeforeRegisterNewUser() {
    const { idCard: id } = this.checkRegisterForm.value;
    this.store.dispatch(userRegistrationAction.checkRegisterInit({ id }));
  }

  get password() {
    return this.checkRegisterForm.get('password')?.value;
  }
  get passwordConfirmation() {
    return this.checkRegisterForm.get('confirmPassword')?.value;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get f() {
    return this.checkRegisterForm.controls;
  }
  registerFormContinue(): void {
    const { idCard, email, password,confirmPassword } = this.checkRegisterForm.value;
    const { city, address, firstName, lastName } = this.finalRegisterForm.value;
    const data: IUser = {
      email: email,
      id: idCard,
       password,
      confirmPassword,
      city,
      address,
      firstName,
      lastName,
      isAdmin: false,
    };

    this.store.dispatch(userRegistrationAction.registerUserInit({ data }));

    this.userAuth = this.store
      .select(ShoppingSelectors.selectLoginInformation)
      .subscribe((userAuth) => {
        console.log({userAuth});
        
        if (userAuth)
          this.store.dispatch(
            shoppingAction.newShoppingCartInit({
              customerRef: userAuth?.userId,
            })
          );
      });
  }

  ngOnDestroy(): void {
    this.userAuth.unsubscribe();
    this.denialOfRegistration.unsubscribe();
  }
}

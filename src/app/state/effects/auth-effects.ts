import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { LoginService } from '../../services/login/login.service';
import { Injectable } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginInit),
      exhaustMap((action) => {
        return this.loginService
          .login({ userEmail: action.userName, userPassword: action.password })
          .pipe(
            map((infoLogin) => UserActions.loginInitSuccess({ infoLogin })),
            catchError((error) =>
              of(UserActions.loginInitFailure({ error }), )
            )
          );
      })
    );
  });

  checkIfUserIsExist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.checkRegisterInit),
      exhaustMap((action) => {
        return this.registerService.isRegistered(action.id).pipe(
          map((success) => UserActions.checkRegisterSuccess({ success })),
          catchError((error) => of(UserActions.checkRegisterFailure({ error })))
        );
      })
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.registerUserInit),
      exhaustMap((action) => {
        return this.registerService.fullRegister(action.data).pipe(
          map((infoLogin) => {
            return UserActions.registerUserSuccess({ infoLogin });
          }),
          catchError((error) => of(UserActions.registerUserFailure({ error })))
        );
      })
    );
  });
}

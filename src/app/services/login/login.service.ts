import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserInformation } from '../../../../../Share/userInformation';
import * as UserInformation from '../../state/actions/user.actions';
import { Shopping } from '../../state/reducers/index';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private store: Store<Shopping>) {}
  private api_login: string = 'http://localhost:3000/api/users/login';
  login(payload: {
    userEmail: string;
    userPassword: string;
  }) {
    return this.http.post<IUserInformation>(this.api_login, {...payload});
  }
}

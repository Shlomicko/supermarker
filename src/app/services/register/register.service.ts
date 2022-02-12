import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shopping } from 'src/app/state/reducers';
import { IUserInformation } from '../../../../../Share/userInformation';
import { IUser } from '../../../../../Share/users';
import * as userRegistrationAction from '../../state/actions/user.actions';
import { CitiesService } from '../store/cities/cities.service';
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private store: Store<Shopping>) {}
  readonly baseUrl = 'http://localhost:3000/api/users/register';

  isRegistered(id: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/user-check`, {
      id,
    });
  }
  fullRegister(data: IUser): Observable<IUserInformation> {
    console.log({data});
    
    return this.http.post<IUserInformation>(
      `${this.baseUrl}/secondStep`,
      data,
      {
        headers,
      }
    );
  }
}

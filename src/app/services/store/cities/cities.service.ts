import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Shopping } from 'src/app/state/reducers';
import { ICities } from '../../../../../../Share/Cities';
import * as shoppingActions from '../../../state/actions/shopping.actions';
@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  readonly cities_url = 'http://localhost:3000/api/store/cities';
  constructor(private http: HttpClient, private store: Store<Shopping>) {}

  fetchCitiesApi(): Observable<ICities[]> {
    return this.http.get<ICities[]>(this.cities_url);
  }
}

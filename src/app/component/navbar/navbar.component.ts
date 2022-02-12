import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Shopping } from 'src/app/state/reducers';
import * as UserAuth from '../../state/selectors/shopping-selectors'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private store:Store<Shopping>) { }
    fullNameUserLogin = this.store.select(UserAuth.selectLoginInformation)
  ngOnInit(): void {
    this.store.select(UserAuth.selectLoginInformation).subscribe((user) => {console.log(user);
    })
  }

}

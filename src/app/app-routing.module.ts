import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './component/shopStore/category/category.component';

import { RegistrationComponent } from './component/auth/registration/registration.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FrontDoorComponent } from './component/front-door/front-door.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'front-door', component: FrontDoorComponent  },
  { path: 'register', component: RegistrationComponent },
  { path: 'store', component: CategoryComponent },
  { path: 'store/category/:categoryRef', component: CategoryComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

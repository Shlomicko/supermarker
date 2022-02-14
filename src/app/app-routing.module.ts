import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'front-door',
    loadChildren: () =>
      import('./component/front-door/front-door.module').then(
        (m) => m.FrontDoorModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./component/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./component/auth/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./component/shopStore/shop.module').then((m) => m.ShopModule),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

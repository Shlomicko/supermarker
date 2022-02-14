import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontDoorComponent } from './front-door.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FrontDoorComponent },
];


@NgModule({
  declarations: [FrontDoorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontDoorModule { }

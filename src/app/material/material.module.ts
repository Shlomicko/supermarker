import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
const MaterielComponent = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatGridListModule,
  MatStepperModule,
  MatToolbarModule,
  MatDialogModule,
  MatDividerModule,
  MatTableModule
];
@NgModule({
  declarations: [],
  imports: [MaterielComponent],
  exports: [MaterielComponent],
})
export class MaterialModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RecipeItemComponent} from './recipe-item/recipe-item.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {JoinPipe} from './join.pipe/join.pipe';
import {TranslocoModule} from '@ngneat/transloco';
import {GenericSelectModule} from '../common/generic-select/generic-select.module';


@NgModule({
  declarations: [
    RecipeItemComponent,
    RecipeFormComponent,
    JoinPipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GenericSelectModule,
    TranslocoModule,
  ],
  exports: [
    RecipeItemComponent,
    RecipeFormComponent,
    JoinPipe,
  ]
})
export class RecipeModule { }

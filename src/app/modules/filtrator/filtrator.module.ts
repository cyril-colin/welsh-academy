import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FiltratorComponent} from './filtrator.component';
import {GenericSelectModule} from '../common/generic-select/generic-select.module';
import {TranslocoModule} from '@ngneat/transloco';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    FiltratorComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GenericSelectModule,
    TranslocoModule,
    MatButtonModule,
  ],
  exports: [
    FiltratorComponent,
  ]
})
export class FiltratorModule { }

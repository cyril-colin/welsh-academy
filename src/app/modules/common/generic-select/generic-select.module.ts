import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { SelectModalComponent } from './select-modal/select-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GenericSelectComponent } from './generic-select.component';
import {DialogModule} from '@angular/cdk/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoModule} from '@ngneat/transloco';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    GenericSelectComponent,
    SelectModalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    DialogModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    TranslocoModule,
    MatListModule,
  ],
  exports: [
    GenericSelectComponent,
  ]
})
export class GenericSelectModule { }

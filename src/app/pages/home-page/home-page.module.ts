import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {MatDividerModule} from '@angular/material/divider';
import {GenericSelectModule} from '../../modules/common/generic-select/generic-select.module';
import {FiltratorModule} from '../../modules/filtrator/filtrator.module';
import {RecipeModule} from '../../modules/recipe/recipe.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslocoModule} from '@ngneat/transloco';
import {JoinPipe} from '../../modules/recipe/join.pipe/join.pipe';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    GenericSelectModule,
    FiltratorModule,
    RecipeModule,
    MatProgressBarModule,
    TranslocoModule,
  ],
  exports: [
    HomePageComponent,
  ]
})
export class HomePageModule {
}

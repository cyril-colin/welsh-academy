import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { GenericSelectModule } from './generic-select/generic-select.module';
import {FiltratorComponent} from './filtrator/filtrator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RecipesService} from './repositories/recipes/recipes.service';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgxsModule} from '@ngxs/store';
import {RecipesState} from './state/recipes/recipes.state';
import {IngredientsState} from './state/ingredients/ingredients.state';
import {RecipeItemComponent} from './recipe-item/recipe-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {JoinPipe} from './join.pipe';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    FiltratorComponent,
    HomePageComponent,
    RecipeItemComponent,
    RecipeFormComponent,
    JoinPipe,
  ],
  imports: [
    BrowserModule,
    GenericSelectModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    NgxsModule.forRoot([RecipesState, IngredientsState], {
      developmentMode: false,
    }),
    MatListModule
  ],
  providers: [
    RecipesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

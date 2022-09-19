import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslocoRootModule} from './transloco-root.module';
import {NgxsModule} from '@ngxs/store';
import {RecipesState} from './data/state/recipes/recipes.state';
import {IngredientsState} from './data/state/ingredients/ingredients.state';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomePageModule} from './pages/home-page/home-page.module';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    MatToolbarModule,
    NgxsModule.forRoot([RecipesState, IngredientsState], {
      developmentMode: false,
    }),
    HomePageModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

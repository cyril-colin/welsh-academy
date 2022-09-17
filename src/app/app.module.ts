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
import {MOCK_INJECT_TOKEN, RecipesService} from './repositories/recipes/recipes.service';
import {MOCKS} from '../mocks';
import {TranslocoModule} from '@ngneat/transloco';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {environment} from '../environments/environment';
import {NgxsModule} from '@ngxs/store';
import {RecipesState} from './state/recipes/recipes.state';
import {IngredientsState} from './state/ingredients/ingredients.state';

@NgModule({
  declarations: [
    AppComponent,
    FiltratorComponent,
    HomePageComponent,
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
    MatProgressBarModule,
    NgxsModule.forRoot([RecipesState, IngredientsState], {
      developmentMode: !environment.production,
    })
  ],
  providers: [
    {provide: MOCK_INJECT_TOKEN, useValue: MOCKS},
    RecipesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

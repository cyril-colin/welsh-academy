import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { AppComponent } from './app.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {GenericSelectComponent} from './modules/common/generic-select/generic-select.component';
import {NgxsModule, Store} from '@ngxs/store';
import {of} from 'rxjs';
import {AppRoutingModule} from './app-routing.module';
import {RecipesState} from './data/state/recipes/recipes.state';
import {IngredientsState} from './data/state/ingredients/ingredients.state';
import {MatSelectModule} from '@angular/material/select';
import {RecipesService} from './data/repositories/recipes/recipes.service';
import {IngredientsService} from './data/repositories/ingredients/ingredients.service';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslocoTestingModule,
        AppRoutingModule,
        NgxsModule.forRoot([RecipesState, IngredientsState]),
        MatSelectModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent,
        MockComponent(GenericSelectComponent),
      ],
      providers: [
        MockProvider(RecipesService),
        MockProvider(IngredientsService),
        MockProvider(Store, {dispatch: (arg: any) => of(null)}),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

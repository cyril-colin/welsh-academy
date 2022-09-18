import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormComponent } from './recipe-form.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Mock, MockComponent, MockProvider} from 'ng-mocks';
import {GenericSelectComponent} from '../generic-select/generic-select.component';
import {Ingredient} from '../models/ingredient';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule, Store} from '@ngxs/store';
import {RecipesState} from '../state/recipes/recipes.state';
import {IngredientsState} from '../state/ingredients/ingredients.state';
import {RecipesService} from '../repositories/recipes/recipes.service';
import {IngredientsService} from '../repositories/ingredients/ingredients.service';
import {of} from 'rxjs';
import {TranslocoTestingModule} from '@ngneat/transloco';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecipeFormComponent,
        MockComponent(GenericSelectComponent<Ingredient>),
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        NgxsModule.forRoot([RecipesState, IngredientsState]),
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        MockProvider(MatDialogRef),
        {provide: MAT_DIALOG_DATA, useValue: null},
        MockProvider(RecipesService),
        MockProvider(IngredientsService),
        MockProvider(Store, {dispatch: (arg: any) => of(null), selectSnapshot: (arg: any) => []}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'adding$', { writable: true });
    component.adding$ = of(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

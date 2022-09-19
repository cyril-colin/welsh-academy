import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {FiltratorComponent} from '../../modules/filtrator/filtrator.component';
import {MatDividerModule} from '@angular/material/divider';
import {RecipeItemComponent} from '../../modules/recipe/recipe-item/recipe-item.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgxsModule, Store} from '@ngxs/store';
import {RecipesState} from '../../data/state/recipes/recipes.state';
import {IngredientsState} from '../../data/state/ingredients/ingredients.state';
import {RecipesService} from '../../data/repositories/recipes/recipes.service';
import {IngredientsService} from '../../data/repositories/ingredients/ingredients.service';
import {of} from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        MockComponent(FiltratorComponent),
        MockComponent(RecipeItemComponent),
      ],
      imports: [
        MatDividerModule,
        MatProgressBarModule,
        NgxsModule.forRoot([RecipesState, IngredientsState]),
      ],
      providers: [
        MockProvider(RecipesService),
        MockProvider(IngredientsService),
        MockProvider(Store, {dispatch: (arg: any) => of(null)}),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'recipes$', { writable: true });
    Object.defineProperty(component, 'isLoading$', { writable: true });
    Object.defineProperty(component, 'isAdding$', { writable: true });
    component.recipes$ = of([]);
    component.isLoading$ = of(false);
    component.isAdding$ = of(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

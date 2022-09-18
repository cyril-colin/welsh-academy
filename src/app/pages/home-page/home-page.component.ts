import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, first, Observable, takeUntil, tap} from 'rxjs';
import {GetAllParams, GetAllParamsInvalidError} from '../../repositories/recipes/recipes.service';
import {Recipe} from '../../models/recipe.model';
import {Select, Store} from '@ngxs/store';
import {RecipesState} from '../../state/recipes/recipes.state';
import {RecipesAction} from '../../state/recipes/recipes.action';
import {RecipeFormComponent, RecipeFormData} from '../../recipe-form/recipe-form.component';
import {DialogService} from '../../dialog.service';
import {AbstractComponent} from '../../models/abstract-component';

export class ApplySearchError extends Error {
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends AbstractComponent implements OnInit, OnDestroy {
  @Select(RecipesState.recipes) public recipes$: Observable<Recipe[]>;
  @Select(RecipesState.isLoading) public isLoading$: Observable<boolean>;
  @Select(RecipesState.isAdding) public isAdding$: Observable<boolean>;
  public recipes: Recipe[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.recipes$.pipe(
      takeUntil(this.destroy$),
      tap(res => {
        this.recipes = res;
        this.cdr.detectChanges();
      }),
    ).subscribe();

    this.isAdding$.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.cdr.detectChanges();
      }),
    ).subscribe();
    this.applySearch();
  }

  public applySearch(searchRequest: GetAllParams = null) {
    this.store.dispatch(new RecipesAction.LoadRecipes(searchRequest)).pipe(
      first(),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.triggerDestroy$();
  }
}

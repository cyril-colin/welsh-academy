import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {catchError, first, Observable} from 'rxjs';
import {GetAllParams, GetAllParamsInvalidError} from '../../repositories/recipes/recipes.service';
import {Recipe} from '../../models/recipe.model';
import {Select, Store} from '@ngxs/store';
import {RecipesState} from '../../state/recipes/recipes.state';
import {RecipesAction} from '../../state/recipes/recipes.action';

export class ApplySearchError extends Error {
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  @Select(RecipesState.recipes) public recipes$: Observable<Recipe[]>;
  @Select(RecipesState.isLoading) public isLoading$: Observable<boolean>;


  constructor(
    private store: Store,
  ) {
  }

  public ngOnInit(): void {
    this.applySearch();
  }

  public applySearch(searchRequest: GetAllParams = null) {
    this.store.dispatch(new RecipesAction.LoadRecipes(searchRequest)).pipe(
      first(),
      catchError(err => {
        if (err instanceof GetAllParamsInvalidError) {
          return this.store.dispatch(new RecipesAction.LoadRecipes())
        }
        throw new ApplySearchError();
      }),
    ).subscribe();
  }

}

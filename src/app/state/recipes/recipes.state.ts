import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Recipe} from '../../models/recipe.model';
import {RecipesAction} from './recipes.action';
import {finalize, Observable, tap} from 'rxjs';
import {WAPacket} from '../../repositories/models';
import {RecipesService} from '../../repositories/recipes/recipes.service';

interface RecipeStateModel {
  loading: boolean;
  recipes: Recipe[];
}
@State<RecipeStateModel>({
  name: 'recipes',
  defaults: {
    loading: false,
    recipes: [],
  }
})
@Injectable()
export class RecipesState {
  @Selector()
  public static recipes(state: RecipeStateModel): Recipe[] {
    return state.recipes;
  }

  @Selector()
  public static isLoading(state: RecipeStateModel): boolean {
    return state.loading;
  }

  constructor(
    private recipeService: RecipesService,
  ) {
  }

  @Action(RecipesAction.LoadRecipes)
  public loadRecipes(ctx: StateContext<RecipeStateModel>, action: RecipesAction.LoadRecipes): Observable<WAPacket<Recipe[]>> {
    ctx.patchState({loading: true});
    return this.recipeService.getAll(action.searchRequest).pipe(
      tap(packet => {
        ctx.patchState({recipes: packet.data});
      }),
      finalize(() => ctx.patchState({loading: false})),
    )
  }
}

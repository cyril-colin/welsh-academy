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
  adding: boolean;
}

export class NoRecipeFoundInState extends Error {}

@State<RecipeStateModel>({
  name: 'recipes',
  defaults: {
    loading: false,
    recipes: [],
    adding: false,
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
  @Selector()
  public static isAdding(state: RecipeStateModel): boolean {
    return state.adding;
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

  @Action(RecipesAction.NewRecipe)
  public newRecipe(ctx: StateContext<RecipeStateModel>, action: RecipesAction.NewRecipe): Observable<WAPacket<Recipe>> {
    ctx.patchState({adding: true});
    return this.recipeService.newRecipe(action.newRecipe).pipe(
      tap(packet => {
        const recipes = ctx.getState().recipes;
        recipes.push(packet.data);
        ctx.patchState({recipes});
      }),
      finalize(() => ctx.patchState({adding: false})),
    )
  }

  @Action(RecipesAction.EditRecipe)
  public editRecipe(ctx: StateContext<RecipeStateModel>, action: RecipesAction.EditRecipe): Observable<WAPacket<Recipe>> {
    ctx.patchState({adding: true});
    return this.recipeService.editRecipe(action.recipe).pipe(
      tap(packet => {
        const recipes = ctx.getState().recipes;
        const existing = recipes.findIndex(r => r.token === packet.data.token);
        if (!existing) {
          throw new NoRecipeFoundInState()
        }
        recipes[existing] = packet.data;
        ctx.setState({...ctx.getState(), recipes});
      }),
      finalize(() => ctx.setState({...ctx.getState(), adding: false})),
    )
  }

  @Action(RecipesAction.DeleteRecipe)
  public deleteRecipe(ctx: StateContext<RecipeStateModel>, action: RecipesAction.DeleteRecipe): Observable<WAPacket<Recipe>> {
    ctx.patchState({adding: true});
    return this.recipeService.delete(action.recipe).pipe(
      tap(packet => {
        const existing = ctx.getState().recipes.findIndex(r => r.token === packet.data.token);
        if (!existing) {
          throw new NoRecipeFoundInState()
        }

        const recipes = ctx.getState().recipes.filter(r => r.token !== packet.data.token);
        ctx.patchState({recipes});
      }),
      finalize(() => ctx.patchState({adding: false})),
    )
  }
}

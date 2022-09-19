import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {IngredientsAction} from './ingredients.action';
import {finalize, Observable, tap} from 'rxjs';
import {WAPacket} from '../../repositories/wa-packet.model';
import {Ingredient} from '../../../models/ingredient';
import {IngredientsService} from '../../repositories/ingredients/ingredients.service';

interface IngredientStateModel {
  loading: boolean;
  ingredients: Ingredient[];
}
@State<IngredientStateModel>({
  name: 'ingredients',
  defaults: {
    loading: false,
    ingredients: [],
  }
})
@Injectable()
export class IngredientsState {
  @Selector()
  public static ingredients(state: IngredientStateModel): Ingredient[] {
    return state.ingredients;
  }

  @Selector()
  public static isLoading(state: IngredientStateModel): boolean {
    return state.loading;
  }

  constructor(
    private ingredientService: IngredientsService,
  ) {
  }

  @Action(IngredientsAction.LoadIngredients)
  public loadIngredient(ctx: StateContext<IngredientStateModel>): Observable<WAPacket<Ingredient[]>> {
    ctx.patchState({loading: true});
    return this.ingredientService.getAll().pipe(
      tap(packet => {
        ctx.patchState({ingredients: packet.data});
      }),
      finalize(() => ctx.patchState({loading: false})),
    )
  }
}

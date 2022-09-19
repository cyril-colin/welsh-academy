import {Injectable, InjectionToken} from '@angular/core';
import {first, map, Observable, timer} from 'rxjs';
import {WAPacket} from '../models';
import {Recipe} from '../../models/recipe.model';
import {MockService} from '../mock.service';

export const FAKE_TIMER = 500;

export interface GetAllParams {
  searchText?: string;
  ingredients?: string[];
}
export function uuidv4(): string {
  return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export class GetAllParamsInvalidError extends Error {}

export class RecipeNotFoundError extends Error {}

export const MOCK_INJECT_TOKEN = new InjectionToken<string>('MOCK_INJECT_TOKEN')

@Injectable()
export class RecipesService {
  public static isGetAllParamsValid(filters?: GetAllParams): boolean {
    if (!filters) {
      return true;
    }
    const textIsValid = !!filters?.searchText;
    const ingredientsValid = !!filters?.ingredients && filters.ingredients.length > 0;
    return textIsValid || ingredientsValid;
  }

  constructor(
    private mocks: MockService,
  ) {
  }

  public getAll(filters?: GetAllParams): Observable<WAPacket<Recipe[]>> {

    return timer(FAKE_TIMER).pipe(
      first(),
      map(() => {
        const packet: WAPacket<Recipe[]> = {meta: null, data: this.mocks.mocks.recipes};
        if (filters && (filters.searchText || filters.ingredients?.length > 0)) {
          if (!RecipesService.isGetAllParamsValid(filters)) {
            throw new GetAllParamsInvalidError();
          }
          packet.data = packet.data.filter(recipe => {
            const conditions: boolean[] = [];
            if (filters.searchText) {
              conditions.push(recipe.name.toLowerCase().includes(filters.searchText.toLowerCase()));
            }
            if (filters.ingredients) {
              conditions.push(!!recipe.ingredients.find(ingredient => filters.ingredients?.includes(ingredient.token)))
            }

            return conditions.reduce((acc: boolean, currentValue: boolean) => {
              acc = acc || currentValue;
              return acc;
            }, false);
          });
        }
        packet.data = structuredClone(packet.data)
        return packet;
      }));
  }

  public newRecipe(newRecipe: Recipe): Observable<WAPacket<Recipe>> {
    return timer(FAKE_TIMER).pipe(
      first(),
      map(() => {
        newRecipe.token = uuidv4();
        this.mocks.mocks.recipes.push(newRecipe)

        return {data: newRecipe, meta: null};
      }));
  }

  public editRecipe(recipe: Recipe): Observable<WAPacket<Recipe>> {
    return timer(FAKE_TIMER).pipe(
      first(),
      map(() => {
        const existingIndex = this.mocks.mocks.recipes.findIndex(r => r.token === recipe.token);
        if (existingIndex < 0) {
          throw new RecipeNotFoundError();
        }
        const result = this.mocks.mocks.recipes[existingIndex] = recipe;

        return {data: result, meta: null};
      }));
  }

  public delete(recipe: Recipe): Observable<WAPacket<Recipe>> {
    return timer(FAKE_TIMER).pipe(
      first(),
      map(() => {
        const existingIndex = this.mocks.mocks.recipes.findIndex(r => r.token === recipe.token);
        if (existingIndex < 0) {
          throw new RecipeNotFoundError();
        }
        const result = this.mocks.mocks.recipes[existingIndex];
        this.mocks.mocks.recipes.slice(existingIndex, 1);

        return {data: result, meta: null};
      }));
  }


}

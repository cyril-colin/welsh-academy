import {Inject, Injectable, InjectionToken} from '@angular/core';
import {first, map, Observable, throwError, timer} from 'rxjs';
import {WAPacket} from '../models';
import {Mocks} from '../../../mocks';
import {Recipe} from '../../models/recipe.model';

export const FAKE_TIMER = 500;

export interface GetAllParams {
  searchText?: string;
  ingredients?: string[];
}

export class GetAllParamsInvalidError extends Error {
  public override name = 'GetAllParamsInvalidError';
}

export const MOCK_INJECT_TOKEN = new InjectionToken<string>('MOCK_INJECT_TOKEN')

@Injectable()
export class RecipesService {
  private static isGetAllParamsValid(filters?: GetAllParams): boolean {
    const textIsValid = !!filters?.searchText;
    const ingredientsValid = !!filters?.ingredients && filters.ingredients.length > 0;
    return textIsValid || ingredientsValid;
  }

  constructor(
    @Inject(MOCK_INJECT_TOKEN) private mocks: Mocks,
  ) {
  }

  public getAll(filters?: GetAllParams): Observable<WAPacket<Recipe[]>> {

    return timer(FAKE_TIMER).pipe(
      first(),
      map(() => {
        const packet: WAPacket<Recipe[]> = {meta: null, data: this.mocks.recipes};
        if (filters) {
          if (!RecipesService.isGetAllParamsValid(filters)) {
            throw new GetAllParamsInvalidError();
          }
          packet.data = packet.data.filter(recipe => {
            const conditions: boolean[] = [];
            if (filters.searchText) {
              conditions.push(recipe.name.includes(filters.searchText));
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
        return packet;
      }));
  }


}

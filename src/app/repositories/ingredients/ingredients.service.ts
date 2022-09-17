import {Inject, Injectable} from '@angular/core';
import {map, Observable, timer} from 'rxjs';
import {WAPacket} from '../models';
import {Ingredient} from '../../models/ingredient';
import {Mocks} from '../../../mocks';
import {MOCK_INJECT_TOKEN} from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    @Inject(MOCK_INJECT_TOKEN) private mocks: Mocks,
  ) { }

  public getAll(): Observable<WAPacket<Ingredient[]>> {
    return timer(500).pipe(map(() => {
      const packet: WAPacket<Ingredient[]> = {
        meta: null,
        data: this.mocks.ingredients,
      };
      return packet;
    }));
  }
}

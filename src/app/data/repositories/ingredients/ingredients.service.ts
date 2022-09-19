import {Inject, Injectable} from '@angular/core';
import {map, Observable, timer} from 'rxjs';
import {WAPacket} from '../wa-packet.model';
import {Ingredient} from '../../../models/ingredient';
import {MockService} from '../mock.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(
    private mocks: MockService,
  ) { }

  public getAll(): Observable<WAPacket<Ingredient[]>> {
    return timer(500).pipe(map(() => {
      const packet: WAPacket<Ingredient[]> = {
        meta: null,
        data: this.mocks.mocks.ingredients,
      };
      return packet;
    }));
  }
}

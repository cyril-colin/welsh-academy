import { TestBed } from '@angular/core/testing';

import { IngredientsService } from './ingredients.service';
import {Ingredient} from '../../models/ingredient';
import {Recipe} from '../../models/recipe.model';
import {MockService} from '../mock.service';

describe('IngredientsService', () => {
  let service: IngredientsService;
  let MOCKS: any;

  beforeEach(() => {
    const i: Ingredient[] = [
      {token: 'cucumberToken', name: 'cucumber'},
      {token: 'CarotToken', name: 'Carot'},
      {token: 'appleToken', name: 'apple'},
      {token: 'saltToken', name: 'salt'},
      {token: 'sugarToken', name: 'sugar'},
      {token: 'meatToken', name: 'meat'},
    ];
    const r: Recipe[] = [
      {token: 'recipe1', name: 'recipe1', ingredients: [i[1], i[2], i[3]]},
      {token: 'recipe2', name: 'recipe2', ingredients: [i[0], i[5], i[4]]},
      {token: 'recipe3', name: 'recipe3', ingredients: [i[2], i[3], i[4]]},
      {token: 'recipe4', name: 'recipe4', ingredients: [i[1], i[0], i[2]]},
      {token: 'recipe5', name: 'recipe5', ingredients: [i[5], i[4], i[3]]},
    ]
    MOCKS = {
      ingredients: i,
      recipes: r,
    }
    TestBed.configureTestingModule({
      providers: [
        IngredientsService,
        {provide: MockService, useValue: {mocks: MOCKS}},
      ]
    });
    service = TestBed.inject(IngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

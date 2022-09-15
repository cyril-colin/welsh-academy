import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FAKE_TIMER, GetAllParamsInvalidError, MOCK_INJECT_TOKEN, RecipesService} from './recipes.service';
import {Mocks} from '../../../mocks';
import {Ingredient} from '../../models/ingredient';
import {Recipe} from '../../models/recipe.model';
import {catchError, of, tap} from 'rxjs';

describe('RecipesService', () => {
  let service: RecipesService;
  let MOCKS: Mocks;
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
        RecipesService,
        {provide: MOCK_INJECT_TOKEN, useValue: MOCKS},
      ]
    });
    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all recipes', fakeAsync(() => {
    service.getAll().pipe(
      tap(res => {
        expect(res.data.length).toBe(MOCKS.recipes.length);
      }),
    ).subscribe();
    tick(FAKE_TIMER);
  }));
  it('should get all recipes by text', fakeAsync(() => {
    service.getAll({searchText: '1'}).pipe(
      tap(res => {
        expect(res.data.length).toBe(1);
      }),
    ).subscribe();
    tick(FAKE_TIMER);
  }));

  it('should get all recipes by ingredients', fakeAsync(() => {
    service.getAll({ingredients: ['cucumberToken']}).pipe(
      tap(res => {
        expect(res.data.length).toBe(2);
      }),
    ).subscribe();
    tick(FAKE_TIMER);
  }));

  it('should get all recipes by both ingredients and text', fakeAsync(() => {
    service.getAll({searchText: '1', ingredients: ['cucumberToken']}).pipe(
      tap(res => {
        expect(res.data.length).toBe(3);
      }),
    ).subscribe();
    tick(FAKE_TIMER);
  }));

  it('should throw error with invalid search', fakeAsync(() => {
    service.getAll({searchText: '', ingredients: []}).pipe(
      catchError(err => {
        expect(err).toBeInstanceOf(GetAllParamsInvalidError);
        return of(null);
      }),
    ).subscribe();

    tick(FAKE_TIMER);
  }));
});

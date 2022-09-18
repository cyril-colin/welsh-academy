import {Injectable} from '@angular/core';
import {Ingredient} from '../models/ingredient';
import {Recipe} from '../models/recipe.model';

@Injectable({providedIn: 'root'})
export class MockService {
  private i: Ingredient[] = [
    {token: 'cucumberToken', name: 'cucumber'},
    {token: 'CarotToken', name: 'Carot'},
    {token: 'appleToken', name: 'apple'},
    {token: 'saltToken', name: 'salt'},
    {token: 'sugarToken', name: 'sugar'},
    {token: 'meatToken', name: 'meat'},
  ];

  private r: Recipe[] = [
    {token: 'recipe1', name: 'recipe1', ingredients: [this.i[1], this.i[2], this.i[3]]},
    {token: 'recipe2', name: 'recipe2', ingredients: [this.i[0], this.i[5], this.i[4]]},
    {token: 'recipe3', name: 'recipe3', ingredients: [this.i[2], this.i[3], this.i[4]]},
    {token: 'recipe4', name: 'recipe4', ingredients: [this.i[1], this.i[0], this.i[2]]},
    {token: 'recipe5', name: 'recipe5', ingredients: [this.i[5], this.i[4], this.i[3]]},
  ];

  public mocks = {
    ingredients: this.i,
    recipes: this.r,
  }
}

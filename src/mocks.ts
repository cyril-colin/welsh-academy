import {Ingredient} from './app/models/ingredient';
import {Recipe} from './app/models/recipe.model';
export interface Mocks {
  ingredients: Ingredient[];
  recipes: Recipe[];
}
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
];

export const MOCKS: Mocks = {
  ingredients: i,
  recipes: r,
}

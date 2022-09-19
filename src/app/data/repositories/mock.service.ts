import {Injectable} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {Recipe} from '../../models/recipe.model';
import {uuidv4} from './recipes/recipes.service';

@Injectable({providedIn: 'root'})
export class MockService {
  private i: Ingredient[] = [
    {token: uuidv4(), name: 'Cucumber'},
    {token: uuidv4(), name: 'Carrot'},
    {token: uuidv4(), name: 'Apple'},
    {token: uuidv4(), name: 'Salt'},
    {token: uuidv4(), name: 'Sugar'},
    {token: uuidv4(), name: 'Meat'},
    {token: uuidv4(), name: 'Chicken'},
    {token: uuidv4(), name: 'Ketchup'},
    {token: uuidv4(), name: 'Mayonnaise'},
    {token: uuidv4(), name: 'Sour cream'},
    {token: uuidv4(), name: 'Milk'},
    {token: uuidv4(), name: 'Honey'},
    {token: uuidv4(), name: 'Chocolate'},
    {token: uuidv4(), name: 'Cacao'},
    {token: uuidv4(), name: 'Beef'},
    {token: uuidv4(), name: 'Bear'},
    {token: uuidv4(), name: 'Coffee'},
    {token: uuidv4(), name: 'Guacamole'},
    {token: uuidv4(), name: 'Plain flour'},
  ];

  private r: Recipe[] = [
    {token: uuidv4(), name: 'Salad', ingredients: [this.i[1], this.i[2], this.i[3]]},
    {token: uuidv4(), name: 'Pastas', ingredients: [this.i[0], this.i[5], this.i[4]]},
    {token: uuidv4(), name: 'Pizzas', ingredients: [this.i[2], this.i[3], this.i[4]]},
    {token: uuidv4(), name: 'Sushi', ingredients: [this.i[1], this.i[0], this.i[2]]},
    {token: uuidv4(), name: 'Pancakes', ingredients: [this.i[5], this.i[4], this.i[3]]},
    {token: uuidv4(), name: 'Pudding', ingredients: [this.i[5], this.i[4], this.i[3]]},
  ];

  public mocks = {
    ingredients: this.i,
    recipes: this.r,
  }
}

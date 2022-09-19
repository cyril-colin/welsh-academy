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
    {token: uuidv4(), name: 'Salad', ingredients: [this.i[1], this.i[2], this.i[3]], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in est nec mi fermentum faucibus. Vestibulum eu iaculis tortor. Donec cursus'},
    {token: uuidv4(), name: 'Pastas', ingredients: [this.i[0], this.i[5], this.i[4]], description: ' Phasellus nec ornare dui. Quisque quis pulvinar ante. Proin hendrerit quam sit amet est volutpat, mollis vestibulum leo pellentesque. '},
    {token: uuidv4(), name: 'Pizzas', ingredients: [this.i[2], this.i[3], this.i[4]], description: 'Suspendisse imperdiet pellentesque lectus, ut tristique dolor condimentum ut. Donec vel finibus justo. Integer pulvinar pharetra tempor. Cras sit amet aliquet lorem.'},
    {token: uuidv4(), name: 'Sushi', ingredients: [this.i[1], this.i[0], this.i[2]], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in tortor aliquet, iaculis neque semper, finibus orci. Mauris non iaculis sem. Aliquam erat volutpat. In at elit sit amet odio '},
    {token: uuidv4(), name: 'Pancakes', ingredients: [this.i[5], this.i[4], this.i[3]], description: 'Pellentesque sed tellus tristique, interdum ex non, volutpat nisl. Nulla gravida sagittis nunc, ut maximus quam bibendum id. Aliquam pellentesque sem metus, a gravida leo aliquam at. Fusce ac ligula et elit ullamcorper euismod et vitae nibh. Cras rhoncus eros risus, non suscipit libero aliquet quis. Sed semper luctus tortor sed eleifend. Vivamus hendrerit lobortis ante ut interdum. Praesent auctor vitae sapien sit amet consectetur.'},
    {token: uuidv4(), name: 'Pudding', ingredients: [this.i[5], this.i[4], this.i[3]], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in est nec mi fermentum faucibus. Vestibulum eu iaculis tortor. Donec cursus porta laoreet. Donec luctus eros turpis, eu luctus sapien lacinia vel. Aliquam vestibulum libero in arcu ultricies feugiat. Integer venenatis placerat massa vestibulum maximus. Etiam augue enim, interdum ut elit vel, ullamcorper laoreet mi. Pellentesque aliquet eros ac dui egestas mollis. Morbi justo arcu, faucibus id luctus id, pellentesque ac nibh.'},
  ];

  public mocks = {
    ingredients: this.i,
    recipes: this.r,
  }
}

import { Ingredient } from './ingredient';

export interface Recipe {
    token: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
}

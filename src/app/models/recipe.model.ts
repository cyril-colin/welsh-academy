import { Ingredient } from './ingredient';

export interface Recipe {
    token: string;
    name: string;
    ingredients: Ingredient[];
}
import {GetAllParams} from '../../repositories/recipes/recipes.service';

export namespace RecipesAction {
  export class LoadRecipes {
    static readonly type = '[recipes] LoadRecipes';
    constructor(public searchRequest: GetAllParams = null) {
    }
  }
}


import {GetAllParams} from '../../repositories/recipes/recipes.service';
import {Recipe} from '../../../models/recipe.model';

export namespace RecipesAction {
  export class LoadRecipes {
    static readonly type = '[recipes] LoadRecipes';
    constructor(public searchRequest: GetAllParams = null) {
    }
  }

  export class NewRecipe {
    static readonly type = '[recipes] NewRecipe';
    constructor(public newRecipe: Recipe) {
    }
  }

  export class EditRecipe {
    static readonly type = '[recipes] EditRecipe';
    constructor(public recipe: Recipe) {
    }
  }

  export class DeleteRecipe {
    static readonly type = '[recipes] DeleteRecipe';
    constructor(public recipe: Recipe) {
    }
  }
}


import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SelectOption } from './generic-select/generic-select.component';
import { Ingredient } from './models/ingredient';
import {map, Observable, tap} from 'rxjs';
import {IngredientsService} from './repositories/ingredients/ingredients.service';
import {GetAllParams} from './repositories/recipes/recipes.service';
import {Store} from '@ngxs/store';
import {IngredientsAction} from './state/ingredients/ingredients.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  constructor(
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new IngredientsAction.LoadIngredients()).subscribe();
  }


}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SelectOption } from './generic-select/generic-select.component';
import { Ingredient } from './models/ingredient';
import {map, Observable, tap} from 'rxjs';
import {IngredientsService} from './repositories/ingredients/ingredients.service';
import {GetAllParams} from './repositories/recipes/recipes.service';

export function uuidv4(): string {
  return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, (c: any) =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  constructor(

  ) {}

  public ngOnInit(): void {

  }


}

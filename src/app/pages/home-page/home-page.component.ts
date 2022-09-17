import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SelectOption} from '../../generic-select/generic-select.component';
import {Ingredient} from '../../models/ingredient';
import {catchError, EMPTY, finalize, map, Observable, tap} from 'rxjs';
import {IngredientsService} from '../../repositories/ingredients/ingredients.service';
import {GetAllParams, GetAllParamsInvalidError, RecipesService} from '../../repositories/recipes/recipes.service';
import {uuidv4} from '../../app.component';
import {Recipe} from '../../models/recipe.model';

export class ApplySearchError extends Error {
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public options: SelectOption<Ingredient>[] = [
    {data: {token: uuidv4(), name: 'cucumber'}, label: 'cucumber', selected: true},
    {data: {token: uuidv4(), name: 'Carot'}, label: 'Carot', selected: true},
    {data: {token: uuidv4(), name: 'apple'}, label: 'apple', selected: true},
    {data: {token: uuidv4(), name: 'salt'}, label: 'salt', selected: true},
    {data: {token: uuidv4(), name: 'sugar'}, label: 'sugar', selected: true},
    {data: {token: uuidv4(), name: 'meat'}, label: 'meat', selected: true},
  ];

  public selection: Ingredient[] = [];
  public allIngredients$: Observable<Ingredient[]> | null = null;
  public recipes: Recipe[] = [];
  public isLoading = false;

  constructor(
    private ingredientsService: IngredientsService,
    private recipesService: RecipesService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.allIngredients$ = this.ingredientsService.getAll().pipe(
      map(res => res.data),
    );

    this.applySearch();
  }

  public applySearch(searchRequest: GetAllParams = null) {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.recipesService.getAll(searchRequest).pipe(
      catchError(err => {
        if (err instanceof GetAllParamsInvalidError) {
          return this.recipesService.getAll();
        }
        throw new ApplySearchError();
      }),
      tap(packet => {
        this.recipes = packet.data;
        this.cdr.detectChanges();
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

}

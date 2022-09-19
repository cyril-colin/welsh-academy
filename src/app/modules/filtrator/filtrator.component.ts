import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IngredientsService} from '../../data/repositories/ingredients/ingredients.service';
import {Ingredient} from '../../models/ingredient';
import {SelectOption} from '../common/generic-select/generic-select.component';
import {GetAllParams} from '../../data/repositories/recipes/recipes.service';
import {Store} from '@ngxs/store';
import {IngredientsState} from '../../data/state/ingredients/ingredients.state';
import {map, Observable} from 'rxjs';

interface GetAllParamsForm {
  searchText: FormControl<string | null>;
  ingredients: FormControl<string[] | null>;
}
@Component({
  selector: 'app-filtrator',
  templateUrl: './filtrator.component.html',
  styleUrls: ['./filtrator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltratorComponent implements OnInit {
  @Output() private newFilters = new EventEmitter<GetAllParams>();
  public allIngredients$: Observable<SelectOption<Ingredient>[]> ;
  public form: FormGroup<GetAllParamsForm> | null = null;

  private static generateSelectOptions(ingredients: Ingredient[]): SelectOption<Ingredient>[] {
    return ingredients.map(res => {
      return {
        data: res,
        label: res.name,
        selected: false,
      }
    });
  }

  constructor(
    private ingredientsRepository: IngredientsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.allIngredients$ = this.store.select(IngredientsState.ingredients).pipe(
      map(ingredients => FiltratorComponent.generateSelectOptions(ingredients)),
    );


    this.form = this.fb.group({
      ingredients: this.fb.control<string[]>([]),
      searchText: this.fb.control<string>(null),
    });
  }

  public newIngredientsSelection(selection: Ingredient[]): void {
    this.form?.controls.ingredients.setValue(selection.map(s => s.token));
    this.cdr.detectChanges();
  }

  public applyFilters(): void {
    const form = this.form?.getRawValue();
    this.newFilters.emit({
      searchText: form?.searchText ?? '',
      ingredients: form?.ingredients ?? [],
    });
  }

  public clearFilters(): void {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

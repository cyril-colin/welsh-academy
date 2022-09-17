import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IngredientsService} from '../repositories/ingredients/ingredients.service';
import {Ingredient} from '../models/ingredient';
import {SelectOption} from '../generic-select/generic-select.component';
import {GetAllParams} from '../repositories/recipes/recipes.service';

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
  @Input() public allIngredients: Ingredient[] = [];
  @Output() private newFilters = new EventEmitter<GetAllParams>();
  public ingredientOptions: SelectOption<Ingredient>[] = [];
  public form: FormGroup<GetAllParamsForm> | null = null;
  constructor(
    private ingredientsRepository: IngredientsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.ingredientOptions = this.generateSelectOptions();

    this.form = this.fb.group({
      ingredients: this.fb.control<string[]>([]),
      searchText: this.fb.control<string>(''),
    });
  }

  private generateSelectOptions(): SelectOption<Ingredient>[] {
    return this.allIngredients.map(res => {
      return {
        data: res,
        label: res.name,
        selected: false,
      }
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
}

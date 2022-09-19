import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Recipe} from '../../../models/recipe.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../../models/ingredient';
import {Select, Store} from '@ngxs/store';
import {IngredientsState} from '../../../data/state/ingredients/ingredients.state';
import {SelectOption} from '../../common/generic-select/generic-select.component';
import {Observable, takeUntil, tap} from 'rxjs';
import {RecipesState} from '../../../data/state/recipes/recipes.state';
import {RecipesAction} from '../../../data/state/recipes/recipes.action';
import {AbstractComponent} from '../../../models/abstract-component';

export interface RecipeFormData {
  recipe: Recipe;
}

export interface RecipeForm {
  name: FormControl<string>;
  description: FormControl<string>;
  ingredients: FormControl<Ingredient[]>;
}


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent extends AbstractComponent implements OnInit, OnDestroy {
  public form: FormGroup<RecipeForm>;
  public ingredients: SelectOption<Ingredient>[] = [];
  @Select(RecipesState.isAdding) public adding$: Observable<boolean>;
  public adding = false;


  constructor(
    public dialogRef: MatDialogRef<RecipeFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: RecipeFormData,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    console.log(this.data?.recipe);
    this.form = this.fb.group({
      name: this.fb.control(this.data?.recipe?.name ?? null, [Validators.required]),
      description: this.fb.control(this.data?.recipe?.description ?? null, [Validators.required]),
      ingredients: this.fb.control(this.data?.recipe?.ingredients ?? [], [Validators.required, Validators.minLength(1)]),
    });

    this.ingredients = this.store.selectSnapshot(IngredientsState.ingredients).map(i => ({
      data: i,
      label: i.name,
      selected: !!this.data?.recipe?.ingredients.find(selectedIngredient => i.token === selectedIngredient.token),
    }));

    this.adding$.pipe(
      takeUntil(this.destroy$),
      tap(res => {
        this.adding = res;
        this.cdr.detectChanges();
      }),
    ).subscribe();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public setIngredients(selection: Ingredient[]): void {
    this.form.controls.ingredients.setValue(selection);
  }

  public submit(): void {
    this.form.markAsDirty();
    if (!this.form.valid) {
      return;
    }
    const formResult = this.form.getRawValue();

    let action;
    const newData: Recipe = {
      name: formResult.name,
      ingredients: formResult.ingredients,
      description: formResult.description,
      token: null,
    }
    if (this.data) {
      newData.token = this.data?.recipe.token;
      action = this.store.dispatch(new RecipesAction.EditRecipe(newData));
    } else {
      action = this.store.dispatch(new RecipesAction.NewRecipe(newData));
    }

    action.pipe(tap(() => this.dialogRef.close())).subscribe()
  }

  public ngOnDestroy(): void {
    this.triggerDestroy$();
  }
}

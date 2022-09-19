import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {MatDialog} from '@angular/material/dialog';
import {RecipeFormComponent} from '../recipe-form/recipe-form.component';
import {finalize, tap} from 'rxjs';
import {DialogService} from '../../common/dialog.service/dialog.service';
import {TranslocoService} from '@ngneat/transloco';
import {Store} from '@ngxs/store';
import {RecipesAction} from '../../../data/state/recipes/recipes.action';



@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  public ingredientsName: string[] = [];
  public deleting = false;
  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private transloco: TranslocoService,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.ingredientsName = this.recipe.ingredients.map(i => i.name);
  }

  public openEditDialog(): void {
    const dialogRef = this.dialogService.open(RecipeFormComponent, {recipe: this.recipe});
    dialogRef.afterClosed().pipe(
      tap(() => this.cdr.markForCheck()),
    ).subscribe();
  }

  public deleteRecipe(): void {
    if (confirm(this.transloco.translate('recipe.deletion.confirm'))) {
      this.deleting = true;
      this.cdr.detectChanges();
      this.store.dispatch(new RecipesAction.DeleteRecipe(this.recipe)).pipe(
        finalize(() => {
          this.deleting = false;
          this.cdr.detectChanges();
        })
      ).subscribe();
    }
  }
}

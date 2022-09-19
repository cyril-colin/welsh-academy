import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {tap} from 'rxjs';
import {Store} from '@ngxs/store';
import {IngredientsAction} from './data/state/ingredients/ingredients.action';
import {RecipeFormComponent} from './modules/recipe/recipe-form/recipe-form.component';
import {DialogService} from './modules/common/dialog.service/dialog.service';
import {MatSelectChange} from '@angular/material/select';
import {TranslocoService} from '@ngneat/transloco';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private transloco: TranslocoService,
  ) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new IngredientsAction.LoadIngredients()).subscribe();
  }

  public openNewRecipeModal(): void {
    const dialogRef = this.dialogService.open(RecipeFormComponent);
    dialogRef.afterClosed().pipe(
      tap(() => this.cdr.markForCheck()),
    ).subscribe();
  }


  setLanguage($event: MatSelectChange) {
    console.log($event);
    this.transloco.setActiveLang($event.value);
  }
}

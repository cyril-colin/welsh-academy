import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeItemComponent} from './recipe-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {TranslocoTestingModule} from '@ngneat/transloco';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngxs/store';
import {MockPipe, MockProvider} from 'ng-mocks';
import {JoinPipe} from '../join.pipe/join.pipe';
import {MatIconModule} from '@angular/material/icon';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecipeItemComponent,
        MockPipe(JoinPipe),
      ],
      imports: [
        MatDialogModule,
        MatCardModule,
        TranslocoTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        MockProvider(Store),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    component.recipe = {token: 'rToken', name: 'recipeTest', ingredients: [], description: 'description'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

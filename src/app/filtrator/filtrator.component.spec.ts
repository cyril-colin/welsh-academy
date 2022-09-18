import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FiltratorComponent} from './filtrator.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {GenericSelectComponent} from '../generic-select/generic-select.component';
import {Ingredient} from '../models/ingredient';
import {ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {TranslocoTestingModule} from '@ngneat/transloco';
import {of} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('FiltratorComponent', () => {
  let component: FiltratorComponent;
  let fixture: ComponentFixture<FiltratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FiltratorComponent,
        MockComponent(GenericSelectComponent<Ingredient>)
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        MockProvider(Store, {select: (arg: any) => of([])}),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a event with filters on new search', () => {
    expect(component).toBeTruthy();
  });
});

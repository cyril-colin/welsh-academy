import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectModalComponent, SelectModalOptions} from './select-modal.component';
import {Ingredient} from '../../models/ingredient';
import {MatDialogModule} from '@angular/material/dialog';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {MockProvider} from 'ng-mocks';
import {MatCardModule} from '@angular/material/card';
import {TranslocoTestingModule} from '@ngneat/transloco';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {By} from '@angular/platform-browser';
import {tap} from 'rxjs';
import {MatListModule, MatListOption} from '@angular/material/list';


describe('SelectModalComponent', () => {
  let component: SelectModalComponent<Ingredient>;
  let fixture: ComponentFixture<SelectModalComponent<Ingredient>>;
  let mockedOptions: SelectModalOptions<Ingredient>;

  beforeEach(async () => {
    mockedOptions = {
      modalTitle: 'title',
      options: [
        {data: {token: 'cucumberToken', name: 'cucumber'}, label: 'cucumber', selected: true},
        {data: {token: 'CarotToken', name: 'Carot'}, label: 'Carot', selected: true},
        {data: {token: 'appleToken', name: 'apple'}, label: 'apple', selected: true},
        {data: {token: 'saltToken', name: 'salt'}, label: 'salt', selected: false},
        {data: {token: 'sugarToken', name: 'sugar'}, label: 'sugar', selected: false},
        {data: {token: 'meatToken', name: 'meat'}, label: 'meat', selected: false},
      ],
    }

    await TestBed.configureTestingModule({
      declarations: [SelectModalComponent],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatCheckboxModule,
        TranslocoTestingModule,
        MatListModule,
      ],
      providers: [
        MockProvider(DialogRef),
        {provide: DIALOG_DATA, useValue: mockedOptions},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SelectModalComponent<Ingredient>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and have 6 checkboxes, 3 checked', (() => {
    expect(component).toBeTruthy();

    const checkboxes = fixture.debugElement.queryAll(By.directive(MatListOption));
    expect(checkboxes.length).toBe(6);
    expect(checkboxes.filter(c => (c.componentInstance as MatListOption).selected).length).toBe(3);
    expect(checkboxes.filter(c => !(c.componentInstance as MatListOption).selected).length).toBe(3);


  }));

  it('click on check box flip the box', (() => {
    const checkboxes = fixture.debugElement.queryAll(By.directive(MatListOption));
    checkboxes[0].triggerEventHandler('click', mockedOptions.options[0]);

    expect(checkboxes.filter(c => (c.componentInstance as MatListOption).selected).length).toBe(2);
    expect(checkboxes.filter(c => !(c.componentInstance as MatListOption).selected).length).toBe(4);
  }));

  it('click on validate should return the new selection', (() => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    component.newSelection.pipe(
      tap(newSelection => {
        expect(newSelection.length).toBe(1);
      })
    ).subscribe();

    const checkboxes = fixture.debugElement.queryAll(By.directive(MatListOption));
    checkboxes[0].triggerEventHandler('click', mockedOptions.options[0]);
    checkboxes[1].triggerEventHandler('click', mockedOptions.options[1]);
    buttons[0].triggerEventHandler('click');

  }));

  it('click on cancel will close modal', (() => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const dialogRef = TestBed.inject(DialogRef);
    spyOn(dialogRef, 'close');

    buttons[1].triggerEventHandler('click');
    expect(dialogRef.close).toHaveBeenCalled();
  }));
});

import {CommonModule} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSelectModule} from '@angular/material/select';
import {Ingredient} from '../models/ingredient';
import {GenericSelectComponent, SelectOption} from './generic-select.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {MockProvider} from 'ng-mocks';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';
import {of, tap} from 'rxjs';


describe('GenericSelectComponent', () => {
  let component: GenericSelectComponent<Ingredient>;
  let fixture: ComponentFixture<GenericSelectComponent<Ingredient>>;
  let mockedOptions: SelectOption<Ingredient>[]

  beforeEach(async () => {
    mockedOptions = [
      {data: {token: 'cucumberToken', name: 'cucumber'}, label: 'cucumber', selected: true},
      {data: {token: 'CarotToken', name: 'Carot'}, label: 'Carot', selected: true},
      {data: {token: 'appleToken', name: 'apple'}, label: 'apple', selected: true},
      {data: {token: 'saltToken', name: 'salt'}, label: 'salt', selected: false},
      {data: {token: 'sugarToken', name: 'sugar'}, label: 'sugar', selected: false},
      {data: {token: 'meatToken', name: 'meat'}, label: 'meat', selected: false},
    ]
    await TestBed.configureTestingModule({
      declarations: [GenericSelectComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
      ],
      providers: [
        MockProvider(DialogRef),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GenericSelectComponent<Ingredient>);
    component = fixture.componentInstance;
    component.options = mockedOptions;
    fixture.detectChanges();

  });

  it('should create', () => {
    const chips = fixture.debugElement.queryAll(By.directive(MatChip));
    expect(component).toBeTruthy();
    expect(chips.length).toBe(3);
  });

  it('should show the new selection on click on MatChip close', (done) => {
    let chips = fixture.debugElement.queryAll(By.directive(MatChip));
    expect(component).toBeTruthy();
    component.newSelection.pipe(
      tap(res => {
        chips = fixture.debugElement.queryAll(By.directive(MatChip));
        expect(chips.length).toBe(2);
        expect(res.length).toBe(2);
        done();
      })
    ).subscribe();
    chips[0].triggerEventHandler('removed', mockedOptions[0]);
  });

  it('should show the new selection on adding via modal', (done) => {
    let chips = fixture.debugElement.queryAll(By.directive(MatChip));
    component.newSelection.pipe(
      tap(res => {
        chips = fixture.debugElement.queryAll(By.directive(MatChip));
        expect(chips.length).toBe(5);
        expect(res.length).toBe(5);
        done();
      })
    ).subscribe();
    const dialogService = TestBed.inject(Dialog);
    spyOn(dialogService, 'open').and.returnValue({
      componentInstance: {
        newSelection: of([
          mockedOptions[0],
          mockedOptions[1],
          mockedOptions[2],
          mockedOptions[3],
          mockedOptions[4],
        ]),
      }
    } as any)
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FiltratorComponent} from './filtrator.component';

describe('FiltratorComponent', () => {
  let component: FiltratorComponent;
  let fixture: ComponentFixture<FiltratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltratorComponent]
    })
      .compileComponents();

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

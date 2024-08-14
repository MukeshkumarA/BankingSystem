import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLoanFormComponent } from './display-loan-form.component';

describe('DisplayLoanFormComponent', () => {
  let component: DisplayLoanFormComponent;
  let fixture: ComponentFixture<DisplayLoanFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayLoanFormComponent]
    });
    fixture = TestBed.createComponent(DisplayLoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

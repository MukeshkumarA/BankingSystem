import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanformComponent } from './loanform.component';

describe('LoanformComponent', () => {
  let component: LoanformComponent;
  let fixture: ComponentFixture<LoanformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanformComponent]
    });
    fixture = TestBed.createComponent(LoanformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRetirementplanComponent } from './accepted-retirementplan.component';

describe('AcceptedRetirementplanComponent', () => {
  let component: AcceptedRetirementplanComponent;
  let fixture: ComponentFixture<AcceptedRetirementplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedRetirementplanComponent]
    });
    fixture = TestBed.createComponent(AcceptedRetirementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

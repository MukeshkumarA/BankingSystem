import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRetirmentPlanComponent } from './display-retirment-plan.component';

describe('DisplayRetirmentPlanComponent', () => {
  let component: DisplayRetirmentPlanComponent;
  let fixture: ComponentFixture<DisplayRetirmentPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRetirmentPlanComponent]
    });
    fixture = TestBed.createComponent(DisplayRetirmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

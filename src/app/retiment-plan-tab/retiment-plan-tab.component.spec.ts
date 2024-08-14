import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetimentPlanTabComponent } from './retiment-plan-tab.component';

describe('RetimentPlanTabComponent', () => {
  let component: RetimentPlanTabComponent;
  let fixture: ComponentFixture<RetimentPlanTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetimentPlanTabComponent]
    });
    fixture = TestBed.createComponent(RetimentPlanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

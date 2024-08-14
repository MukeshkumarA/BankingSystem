import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRetirementplanComponent } from './rejected-retirementplan.component';

describe('RejectedRetirementplanComponent', () => {
  let component: RejectedRetirementplanComponent;
  let fixture: ComponentFixture<RejectedRetirementplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedRetirementplanComponent]
    });
    fixture = TestBed.createComponent(RejectedRetirementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

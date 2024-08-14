import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRetirementplanComponent } from './pending-retirementplan.component';

describe('PendingRetirementplanComponent', () => {
  let component: PendingRetirementplanComponent;
  let fixture: ComponentFixture<PendingRetirementplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingRetirementplanComponent]
    });
    fixture = TestBed.createComponent(PendingRetirementplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

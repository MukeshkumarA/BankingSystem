import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementplaniframeComponent } from './retirementplaniframe.component';

describe('RetirementplaniframeComponent', () => {
  let component: RetirementplaniframeComponent;
  let fixture: ComponentFixture<RetirementplaniframeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetirementplaniframeComponent]
    });
    fixture = TestBed.createComponent(RetirementplaniframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

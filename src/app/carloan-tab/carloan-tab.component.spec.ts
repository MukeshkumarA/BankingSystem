import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarloanTabComponent } from './carloan-tab.component';

describe('CarloanTabComponent', () => {
  let component: CarloanTabComponent;
  let fixture: ComponentFixture<CarloanTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarloanTabComponent]
    });
    fixture = TestBed.createComponent(CarloanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

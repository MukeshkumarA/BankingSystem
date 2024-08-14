import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarloanComponent } from './carloan.component';

describe('CarloanComponent', () => {
  let component: CarloanComponent;
  let fixture: ComponentFixture<CarloanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarloanComponent]
    });
    fixture = TestBed.createComponent(CarloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

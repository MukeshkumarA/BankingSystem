import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardTabComponent } from './creditcard-tab.component';

describe('CreditcardTabComponent', () => {
  let component: CreditcardTabComponent;
  let fixture: ComponentFixture<CreditcardTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditcardTabComponent]
    });
    fixture = TestBed.createComponent(CreditcardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardApplyComponent } from './debitcard-apply.component';

describe('DebitcardApplyComponent', () => {
  let component: DebitcardApplyComponent;
  let fixture: ComponentFixture<DebitcardApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcardApplyComponent]
    });
    fixture = TestBed.createComponent(DebitcardApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingcreditcardsComponent } from './pendingcreditcards.component';

describe('PendingcreditcardsComponent', () => {
  let component: PendingcreditcardsComponent;
  let fixture: ComponentFixture<PendingcreditcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingcreditcardsComponent]
    });
    fixture = TestBed.createComponent(PendingcreditcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedcreditcardsComponent } from './rejectedcreditcards.component';

describe('RejectedcreditcardsComponent', () => {
  let component: RejectedcreditcardsComponent;
  let fixture: ComponentFixture<RejectedcreditcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedcreditcardsComponent]
    });
    fixture = TestBed.createComponent(RejectedcreditcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedcreditcardsComponent } from './acceptedcreditcards.component';

describe('AcceptedcreditcardsComponent', () => {
  let component: AcceptedcreditcardsComponent;
  let fixture: ComponentFixture<AcceptedcreditcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedcreditcardsComponent]
    });
    fixture = TestBed.createComponent(AcceptedcreditcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

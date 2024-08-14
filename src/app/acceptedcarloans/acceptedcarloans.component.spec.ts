import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedcarloansComponent } from './acceptedcarloans.component';

describe('AcceptedcarloansComponent', () => {
  let component: AcceptedcarloansComponent;
  let fixture: ComponentFixture<AcceptedcarloansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedcarloansComponent]
    });
    fixture = TestBed.createComponent(AcceptedcarloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedhomeloansComponent } from './rejectedhomeloans.component';

describe('RejectedhomeloansComponent', () => {
  let component: RejectedhomeloansComponent;
  let fixture: ComponentFixture<RejectedhomeloansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedhomeloansComponent]
    });
    fixture = TestBed.createComponent(RejectedhomeloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

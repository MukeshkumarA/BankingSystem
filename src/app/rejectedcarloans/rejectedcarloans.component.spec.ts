import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedcarloansComponent } from './rejectedcarloans.component';

describe('RejectedcarloansComponent', () => {
  let component: RejectedcarloansComponent;
  let fixture: ComponentFixture<RejectedcarloansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedcarloansComponent]
    });
    fixture = TestBed.createComponent(RejectedcarloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

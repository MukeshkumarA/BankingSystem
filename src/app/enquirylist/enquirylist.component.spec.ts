import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirylistComponent } from './enquirylist.component';

describe('EnquirylistComponent', () => {
  let component: EnquirylistComponent;
  let fixture: ComponentFixture<EnquirylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnquirylistComponent]
    });
    fixture = TestBed.createComponent(EnquirylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

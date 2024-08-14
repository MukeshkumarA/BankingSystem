import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedhomeloansComponent } from './acceptedhomeloans.component';

describe('AcceptedhomeloansComponent', () => {
  let component: AcceptedhomeloansComponent;
  let fixture: ComponentFixture<AcceptedhomeloansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedhomeloansComponent]
    });
    fixture = TestBed.createComponent(AcceptedhomeloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

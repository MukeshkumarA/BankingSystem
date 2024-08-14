import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedshadowdomComponent } from './nestedshadowdom.component';

describe('NestedshadowdomComponent', () => {
  let component: NestedshadowdomComponent;
  let fixture: ComponentFixture<NestedshadowdomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NestedshadowdomComponent]
    });
    fixture = TestBed.createComponent(NestedshadowdomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeloanTabComponent } from './homeloan-tab.component';

describe('HomeloanTabComponent', () => {
  let component: HomeloanTabComponent;
  let fixture: ComponentFixture<HomeloanTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeloanTabComponent]
    });
    fixture = TestBed.createComponent(HomeloanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

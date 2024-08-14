import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcreditscoreComponent } from './getcreditscore.component';

describe('GetcreditscoreComponent', () => {
  let component: GetcreditscoreComponent;
  let fixture: ComponentFixture<GetcreditscoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcreditscoreComponent]
    });
    fixture = TestBed.createComponent(GetcreditscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

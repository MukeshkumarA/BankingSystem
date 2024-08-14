import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitreasonDialogComponent } from './submitreason-dialog.component';

describe('SubmitreasonDialogComponent', () => {
  let component: SubmitreasonDialogComponent;
  let fixture: ComponentFixture<SubmitreasonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitreasonDialogComponent]
    });
    fixture = TestBed.createComponent(SubmitreasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

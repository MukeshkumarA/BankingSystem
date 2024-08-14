import { TestBed } from '@angular/core/testing';

import { RetirementplanService } from './retirementplan.service';

describe('RetirementplanService', () => {
  let service: RetirementplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetirementplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

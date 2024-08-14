import { TestBed } from '@angular/core/testing';

import { StateandcityService } from './stateandcity.service';

describe('StateandcityService', () => {
  let service: StateandcityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateandcityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

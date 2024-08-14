import { TestBed } from '@angular/core/testing';

import { PandataService } from './pandata.service';

describe('PandataService', () => {
  let service: PandataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

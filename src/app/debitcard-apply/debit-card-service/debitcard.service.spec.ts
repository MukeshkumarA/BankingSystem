import { TestBed } from '@angular/core/testing';

import { DebitcardService } from './debitcard.service';

describe('DebitcardService', () => {
  let service: DebitcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

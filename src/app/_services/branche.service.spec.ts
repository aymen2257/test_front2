import { TestBed } from '@angular/core/testing';

import { BrancheService } from './branche.service';

describe('BrancheService', () => {
  let service: BrancheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrancheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

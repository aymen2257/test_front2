import { TestBed } from '@angular/core/testing';

import { ReclamtionService } from './reclamtion.service';

describe('ReclamtionService', () => {
  let service: ReclamtionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamtionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

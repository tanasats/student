import { TestBed } from '@angular/core/testing';

import { DocfileService } from './docfile.service';

describe('DocfileService', () => {
  let service: DocfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

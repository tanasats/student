import { TestBed } from '@angular/core/testing';

import { RegdataService } from './regdata.service';

describe('RegdataService', () => {
  let service: RegdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

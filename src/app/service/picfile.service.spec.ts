import { TestBed } from '@angular/core/testing';

import { PicfileService } from './picfile.service';

describe('PicfileService', () => {
  let service: PicfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

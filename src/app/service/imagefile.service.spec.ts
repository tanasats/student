import { TestBed } from '@angular/core/testing';

import { ImagefileService } from './imagefile.service';

describe('ImagefileService', () => {
  let service: ImagefileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagefileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

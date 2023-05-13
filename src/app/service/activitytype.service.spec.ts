import { TestBed } from '@angular/core/testing';

import { ActivitytypeService } from './activitytype.service';

describe('ActivitytypeService', () => {
  let service: ActivitytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

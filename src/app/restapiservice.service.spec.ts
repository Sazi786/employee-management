import { TestBed } from '@angular/core/testing';

import { RestapiserviceService } from './restapiservice.service';

describe('RestapiserviceService', () => {
  let service: RestapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IntermedioService } from './intermedio.service';

describe('IntermedioService', () => {
  let service: IntermedioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntermedioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

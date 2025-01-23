import { TestBed } from '@angular/core/testing';

import { ImagenesProdService } from './imagenes-prod.service';

describe('ImagenesProdService', () => {
  let service: ImagenesProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

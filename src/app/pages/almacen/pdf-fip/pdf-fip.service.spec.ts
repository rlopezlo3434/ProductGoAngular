import { TestBed } from '@angular/core/testing';

import { PdfFipService } from './pdf-fip.service';

describe('PdfFipService', () => {
  let service: PdfFipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfFipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

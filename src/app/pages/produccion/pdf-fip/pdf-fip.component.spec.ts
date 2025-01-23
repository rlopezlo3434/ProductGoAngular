import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFipComponent } from './pdf-fip.component';

describe('PdfFipComponent', () => {
  let component: PdfFipComponent;
  let fixture: ComponentFixture<PdfFipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfFipComponent]
    });
    fixture = TestBed.createComponent(PdfFipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

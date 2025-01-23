import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesComponent } from './partes.component';

describe('PartesComponent', () => {
  let component: PartesComponent;
  let fixture: ComponentFixture<PartesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartesComponent]
    });
    fixture = TestBed.createComponent(PartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

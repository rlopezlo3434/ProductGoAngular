import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtidosComponent } from './surtidos.component';

describe('SurtidosComponent', () => {
  let component: SurtidosComponent;
  let fixture: ComponentFixture<SurtidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurtidosComponent]
    });
    fixture = TestBed.createComponent(SurtidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

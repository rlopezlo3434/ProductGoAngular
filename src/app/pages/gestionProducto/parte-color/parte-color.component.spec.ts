import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteColorComponent } from './parte-color.component';

describe('ParteColorComponent', () => {
  let component: ParteColorComponent;
  let fixture: ComponentFixture<ParteColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParteColorComponent]
    });
    fixture = TestBed.createComponent(ParteColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

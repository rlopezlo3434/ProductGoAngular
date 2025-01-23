import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesProdComponent } from './imagenes-prod.component';

describe('ImagenesProdComponent', () => {
  let component: ImagenesProdComponent;
  let fixture: ComponentFixture<ImagenesProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenesProdComponent]
    });
    fixture = TestBed.createComponent(ImagenesProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

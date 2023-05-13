import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputFloatComponent } from './form-input-float.component';

describe('FormInputFloatComponent', () => {
  let component: FormInputFloatComponent;
  let fixture: ComponentFixture<FormInputFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputFloatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

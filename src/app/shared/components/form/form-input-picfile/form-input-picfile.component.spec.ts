import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputPicfileComponent } from './form-input-picfile.component';

describe('FormInputPicfileComponent', () => {
  let component: FormInputPicfileComponent;
  let fixture: ComponentFixture<FormInputPicfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputPicfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputPicfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

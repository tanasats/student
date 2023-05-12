import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormInputComponent } from './datepicker-form-input.component';

describe('DatepickerFormInputComponent', () => {
  let component: DatepickerFormInputComponent;
  let fixture: ComponentFixture<DatepickerFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

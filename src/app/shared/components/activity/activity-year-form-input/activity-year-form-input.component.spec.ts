import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityYearFormInputComponent } from './activity-year-form-input.component';

describe('ActivityYearFormInputComponent', () => {
  let component: ActivityYearFormInputComponent;
  let fixture: ComponentFixture<ActivityYearFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityYearFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityYearFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFacultyFormInputComponent } from './activity-faculty-form-input.component';

describe('ActivityFacultyFormInputComponent', () => {
  let component: ActivityFacultyFormInputComponent;
  let fixture: ComponentFixture<ActivityFacultyFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityFacultyFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityFacultyFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

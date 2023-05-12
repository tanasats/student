import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeFormInputComponent } from './activity-type-form-input.component';

describe('ActivityTypeFormInputComponent', () => {
  let component: ActivityTypeFormInputComponent;
  let fixture: ComponentFixture<ActivityTypeFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTypeFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTypeFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

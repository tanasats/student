import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAgencyFormInputComponent } from './activity-agency-form-input.component';

describe('ActivityAgencyFormInputComponent', () => {
  let component: ActivityAgencyFormInputComponent;
  let fixture: ComponentFixture<ActivityAgencyFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAgencyFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityAgencyFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

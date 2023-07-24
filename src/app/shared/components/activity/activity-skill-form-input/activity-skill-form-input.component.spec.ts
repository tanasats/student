import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySkillFormInputComponent } from './activity-skill-form-input.component';

describe('ActivitySkillFormInputComponent', () => {
  let component: ActivitySkillFormInputComponent;
  let fixture: ComponentFixture<ActivitySkillFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySkillFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySkillFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

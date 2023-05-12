import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTermFormInputComponent } from './activity-term-form-input.component';

describe('ActivityTermFormInputComponent', () => {
  let component: ActivityTermFormInputComponent;
  let fixture: ComponentFixture<ActivityTermFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTermFormInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTermFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

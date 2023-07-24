import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytypeListComponent } from './activitytype-list.component';

describe('ActivitytypeListComponent', () => {
  let component: ActivitytypeListComponent;
  let fixture: ComponentFixture<ActivitytypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitytypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitytypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

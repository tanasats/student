import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytypeListItemComponent } from './activitytype-list-item.component';

describe('ActivitytypeListItemComponent', () => {
  let component: ActivitytypeListItemComponent;
  let fixture: ComponentFixture<ActivitytypeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitytypeListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitytypeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

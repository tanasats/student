import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCard1ListComponent } from './activity-card1-list.component';

describe('ActivityCard1ListComponent', () => {
  let component: ActivityCard1ListComponent;
  let fixture: ComponentFixture<ActivityCard1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCard1ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCard1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

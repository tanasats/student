import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardListItemComponent } from './activity-card-list-item.component';

describe('ActivityCardListItemComponent', () => {
  let component: ActivityCardListItemComponent;
  let fixture: ComponentFixture<ActivityCardListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCardListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

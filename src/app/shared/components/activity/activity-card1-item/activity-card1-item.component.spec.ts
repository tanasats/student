import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCard1ItemComponent } from './activity-card1-item.component';

describe('ActivityCard1ItemComponent', () => {
  let component: ActivityCard1ItemComponent;
  let fixture: ComponentFixture<ActivityCard1ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCard1ItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCard1ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

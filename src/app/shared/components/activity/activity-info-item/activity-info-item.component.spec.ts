import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInfoItemComponent } from './activity-info-item.component';

describe('ActivityInfoItemComponent', () => {
  let component: ActivityInfoItemComponent;
  let fixture: ComponentFixture<ActivityInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityInfoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

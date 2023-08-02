import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityItemDetailComponent } from './activity-item-detail.component';

describe('ActivityItemDetailComponent', () => {
  let component: ActivityItemDetailComponent;
  let fixture: ComponentFixture<ActivityItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityItemDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

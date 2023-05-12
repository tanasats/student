import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityViewDetailsItemComponent } from './activity-view-details-item.component';

describe('ActivityViewDetailsItemComponent', () => {
  let component: ActivityViewDetailsItemComponent;
  let fixture: ComponentFixture<ActivityViewDetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityViewDetailsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityViewDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

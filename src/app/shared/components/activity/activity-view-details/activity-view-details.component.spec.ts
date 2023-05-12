import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityViewDetailsComponent } from './activity-view-details.component';

describe('ActivityViewDetailsComponent', () => {
  let component: ActivityViewDetailsComponent;
  let fixture: ComponentFixture<ActivityViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityViewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

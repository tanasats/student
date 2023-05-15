import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityViewTableComponent } from './activity-view-table.component';

describe('ActivityViewTableComponent', () => {
  let component: ActivityViewTableComponent;
  let fixture: ComponentFixture<ActivityViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityViewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

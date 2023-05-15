import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityViewTableItemComponent } from './activity-view-table-item.component';

describe('ActivityViewTableItemComponent', () => {
  let component: ActivityViewTableItemComponent;
  let fixture: ComponentFixture<ActivityViewTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityViewTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityViewTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitytypeMasterComponent } from './activitytype-master.component';

describe('ActivitytypeMasterComponent', () => {
  let component: ActivitytypeMasterComponent;
  let fixture: ComponentFixture<ActivitytypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitytypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitytypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

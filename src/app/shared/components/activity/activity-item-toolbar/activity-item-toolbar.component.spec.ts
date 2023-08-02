import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityItemToolbarComponent } from './activity-item-toolbar.component';

describe('ActivityItemToolbarComponent', () => {
  let component: ActivityItemToolbarComponent;
  let fixture: ComponentFixture<ActivityItemToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityItemToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityItemToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

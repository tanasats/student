import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityToolbarComponent } from './activity-toolbar.component';

describe('ActivityToolbarComponent', () => {
  let component: ActivityToolbarComponent;
  let fixture: ComponentFixture<ActivityToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

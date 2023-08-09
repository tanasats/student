import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrophyComponent } from './activity-trophy.component';

describe('ActivityTrophyComponent', () => {
  let component: ActivityTrophyComponent;
  let fixture: ComponentFixture<ActivityTrophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTrophyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTrophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

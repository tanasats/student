import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTicketComponent } from './activity-ticket.component';

describe('ActivityTicketComponent', () => {
  let component: ActivityTicketComponent;
  let fixture: ComponentFixture<ActivityTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

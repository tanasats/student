import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasTicketComponent } from './offcanvas-ticket.component';

describe('OffcanvasTicketComponent', () => {
  let component: OffcanvasTicketComponent;
  let fixture: ComponentFixture<OffcanvasTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

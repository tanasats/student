import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasTicketGenerateComponent } from './offcanvas-ticket-generate.component';

describe('OffcanvasTicketGenerateComponent', () => {
  let component: OffcanvasTicketGenerateComponent;
  let fixture: ComponentFixture<OffcanvasTicketGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasTicketGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasTicketGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

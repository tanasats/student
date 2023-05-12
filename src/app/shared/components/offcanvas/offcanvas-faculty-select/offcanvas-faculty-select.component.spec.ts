import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasFacultySelectComponent } from './offcanvas-faculty-select.component';

describe('OffcanvasFacultySelectComponent', () => {
  let component: OffcanvasFacultySelectComponent;
  let fixture: ComponentFixture<OffcanvasFacultySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasFacultySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasFacultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

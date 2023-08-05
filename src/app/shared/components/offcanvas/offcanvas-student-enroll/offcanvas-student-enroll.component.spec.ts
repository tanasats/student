import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasStudentEnrollComponent } from './offcanvas-student-enroll.component';

describe('OffcanvasStudentEnrollComponent', () => {
  let component: OffcanvasStudentEnrollComponent;
  let fixture: ComponentFixture<OffcanvasStudentEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasStudentEnrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasStudentEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

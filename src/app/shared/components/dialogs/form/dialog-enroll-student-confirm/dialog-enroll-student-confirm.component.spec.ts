import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnrollStudentConfirmComponent } from './dialog-enroll-student-confirm.component';

describe('DialogEnrollStudentConfirmComponent', () => {
  let component: DialogEnrollStudentConfirmComponent;
  let fixture: ComponentFixture<DialogEnrollStudentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEnrollStudentConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEnrollStudentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

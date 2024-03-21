import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityImportStudentComponent } from './activity-import-student.component';

describe('ActivityImportStudentComponent', () => {
  let component: ActivityImportStudentComponent;
  let fixture: ComponentFixture<ActivityImportStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityImportStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityImportStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

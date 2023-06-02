import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputFilesComponent } from './form-input-files.component';

describe('FormInputFilesComponent', () => {
  let component: FormInputFilesComponent;
  let fixture: ComponentFixture<FormInputFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

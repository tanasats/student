import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMasterComponent } from './faculty-master.component';

describe('FacultyMasterComponent', () => {
  let component: FacultyMasterComponent;
  let fixture: ComponentFixture<FacultyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

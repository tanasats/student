import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyListItemComponent } from './faculty-list-item.component';

describe('FacultyListItemComponent', () => {
  let component: FacultyListItemComponent;
  let fixture: ComponentFixture<FacultyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

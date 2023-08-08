import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollListItemComponent } from './enroll-list-item.component';

describe('EnrollListItemComponent', () => {
  let component: EnrollListItemComponent;
  let fixture: ComponentFixture<EnrollListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

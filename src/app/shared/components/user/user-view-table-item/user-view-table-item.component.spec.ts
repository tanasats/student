import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTableItemComponent } from './user-view-table-item.component';

describe('UserViewTableItemComponent', () => {
  let component: UserViewTableItemComponent;
  let fixture: ComponentFixture<UserViewTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

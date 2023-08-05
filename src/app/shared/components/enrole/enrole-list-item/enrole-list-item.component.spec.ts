import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroleListItemComponent } from './enrole-list-item.component';

describe('EnroleListItemComponent', () => {
  let component: EnroleListItemComponent;
  let fixture: ComponentFixture<EnroleListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnroleListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnroleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroleListComponent } from './enrole-list.component';

describe('EnroleListComponent', () => {
  let component: EnroleListComponent;
  let fixture: ComponentFixture<EnroleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnroleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnroleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

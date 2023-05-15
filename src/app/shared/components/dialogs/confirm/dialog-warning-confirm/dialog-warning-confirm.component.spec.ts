import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWarningConfirmComponent } from './dialog-warning-confirm.component';

describe('DialogWarningConfirmComponent', () => {
  let component: DialogWarningConfirmComponent;
  let fixture: ComponentFixture<DialogWarningConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWarningConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWarningConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

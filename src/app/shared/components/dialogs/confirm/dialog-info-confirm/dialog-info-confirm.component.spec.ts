import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoConfirmComponent } from './dialog-info-confirm.component';

describe('DialogInfoConfirmComponent', () => {
  let component: DialogInfoConfirmComponent;
  let fixture: ComponentFixture<DialogInfoConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInfoConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInfoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

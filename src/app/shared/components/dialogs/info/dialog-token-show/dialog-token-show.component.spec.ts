import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTokenShowComponent } from './dialog-token-show.component';

describe('DialogTokenShowComponent', () => {
  let component: DialogTokenShowComponent;
  let fixture: ComponentFixture<DialogTokenShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTokenShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTokenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieConcentComponent } from './cookie-concent.component';

describe('CookieConcentComponent', () => {
  let component: CookieConcentComponent;
  let fixture: ComponentFixture<CookieConcentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieConcentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieConcentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

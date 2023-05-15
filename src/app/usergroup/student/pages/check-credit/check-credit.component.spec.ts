import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCreditComponent } from './check-credit.component';

describe('CheckCreditComponent', () => {
  let component: CheckCreditComponent;
  let fixture: ComponentFixture<CheckCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

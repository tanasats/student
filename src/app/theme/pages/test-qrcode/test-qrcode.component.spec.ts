import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQrcodeComponent } from './test-qrcode.component';

describe('TestQrcodeComponent', () => {
  let component: TestQrcodeComponent;
  let fixture: ComponentFixture<TestQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

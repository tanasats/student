import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityScannerComponent } from './activity-scanner.component';

describe('ActivityScannerComponent', () => {
  let component: ActivityScannerComponent;
  let fixture: ComponentFixture<ActivityScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

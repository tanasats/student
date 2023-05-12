import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasTestComponent } from './offcanvas-test.component';

describe('OffcanvasTestComponent', () => {
  let component: OffcanvasTestComponent;
  let fixture: ComponentFixture<OffcanvasTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

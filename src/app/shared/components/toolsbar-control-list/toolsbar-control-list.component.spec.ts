import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsbarControlListComponent } from './toolsbar-control-list.component';

describe('ToolsbarControlListComponent', () => {
  let component: ToolsbarControlListComponent;
  let fixture: ComponentFixture<ToolsbarControlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsbarControlListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsbarControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

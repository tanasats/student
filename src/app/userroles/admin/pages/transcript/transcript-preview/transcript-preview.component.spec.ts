import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptPreviewComponent } from './transcript-preview.component';

describe('TranscriptPreviewComponent', () => {
  let component: TranscriptPreviewComponent;
  let fixture: ComponentFixture<TranscriptPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

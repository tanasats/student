import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-faculty-form-input',
  templateUrl: './activity-faculty-form-input.component.html',
  styleUrls: ['./activity-faculty-form-input.component.scss']
})
export class ActivityFacultyFormInputComponent {
  @Input() fc?: any;
  @Input() label: string = 'เลือกคณะ';
  @Output() onClickSelect = new EventEmitter<any>();

  public moreitem: boolean = true;

  _setValue(id: any) {}
  _onClickSelect() {
    this.onClickSelect.emit(true);
  }

  _toggleMoreitem() {
    this.moreitem = !this.moreitem;
  }

  get customItemLabelClass() {
    return {
      'form-label-invalid':
        this.fc?.invalid && (this.fc?.dirty || this.fc?.touched),
      // 'form-label-required':this.is_required,
    };
  }
}

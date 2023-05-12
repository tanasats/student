import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-term-form-input',
  templateUrl: './activity-term-form-input.component.html',
  styleUrls: ['./activity-term-form-input.component.scss'],
})
export class ActivityTermFormInputComponent {
  @Input() fc?: any;
  @Input() label:any="ภาคเรียน"

  _setValue(value: any) {
    this.fc?.setValue(value);
  }

  get customItemLabelClass(){
    return {
      'form-label-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched),
      // 'form-label-required':this.is_required,
    }
  }

}

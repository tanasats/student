import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-type-form-input',
  templateUrl: './activity-type-form-input.component.html',
  styleUrls: ['./activity-type-form-input.component.scss']
})
export class ActivityTypeFormInputComponent {
  @Input() items:any =[];
  @Input() fc:any;
  @Input() label:string='ประเภทกิจกรรม';

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  } 

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-agency-form-input',
  templateUrl: './activity-agency-form-input.component.html',
  styleUrls: ['./activity-agency-form-input.component.scss']
})
export class ActivityAgencyFormInputComponent {
  @Input() items:any =[];
  @Input() fc:any;
  @Input() readonly:boolean=false;
  @Input() label:string='หน่วยงานจัดกิจกรรม';

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  } 
}

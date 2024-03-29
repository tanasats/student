import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-year-form-input',
  templateUrl: './activity-year-form-input.component.html',
  styleUrls: ['./activity-year-form-input.component.scss']
})
export class ActivityYearFormInputComponent {
  @Input() fc?:any;
  @Input() is_required:boolean=false;
  @Input() is_draft:boolean=false;
  @Input() label?:string="_LABEL_";
  @Input() value?:string;
  @Input() disabled:boolean=false;
  @Input() placeholder:string="ปี พ.ศ.";
  @Input() maxlenght:number=4;

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  } 

  get customItemLabelClass(){
    return {
      'form-label-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched),
      // 'form-label-required':this.is_required,
    }
  }

}

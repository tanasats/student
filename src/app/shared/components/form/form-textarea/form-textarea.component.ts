import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent {
  @Input() fc?:any;
  @Input() is_required:boolean=false;
  @Input() is_draft:boolean=false;
  @Input() label?:string="_LABEL_";
  @Input() value?:string;
  @Input() placeholder:string="";
  @Input() rows:string="7";


  
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

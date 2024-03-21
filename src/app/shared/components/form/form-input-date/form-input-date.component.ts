import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-input-date',
  templateUrl: './form-input-date.component.html',
  styleUrls: ['./form-input-date.component.scss']
})
export class FormInputDateComponent {
  @Input() fc?:any;
  @Input() value?:any;
  @Input() is_requisite:boolean=false;
  @Input() is_draft:boolean=false;
  @Input() label?:string = "_LABEL_";
  
  @Output() onChange = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {
    if(this.fc){
      //this.fc.value=this.fc.value.substr(0,10);
    }
  }

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  }
  
  get customItemLabelClass(){
    return {
      'custom-item-label-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched),
      'form-requisite':this.is_requisite
    }
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-button-submit',
  templateUrl: './form-button-submit.component.html',
  styleUrls: ['./form-button-submit.component.scss']
})
export class FormButtonSubmitComponent {
@Input() form?:any;
@Input() btn_submit:boolean=false;
@Input() btn_submit_disabled:boolean=false;
@Output() onclick_btn_submit= new EventEmitter<any>();

@Input() btn_cancle:boolean=false;
@Input() btn_cancle_disabled:boolean=false;
@Output() onclick_btn_cancle= new EventEmitter<any>();

get isFormValid():boolean{
  return this.form?.valid;
}
}

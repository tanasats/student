import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-button-submit',
  templateUrl: './form-button-submit.component.html',
  styleUrls: ['./form-button-submit.component.scss']
})
export class FormButtonSubmitComponent {
@Input() fc?:any;
@Input() bt_submit:boolean=false;
@Input() is_bt_submit_disabled:boolean=false;
@Output() onclick_bt_submit= new EventEmitter<any>();

@Input() bt_cancle:boolean=false;
@Output() onclick_bt_cancle= new EventEmitter<any>();

}

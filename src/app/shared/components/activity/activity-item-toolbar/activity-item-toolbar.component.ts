import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-item-toolbar',
  templateUrl: './activity-item-toolbar.component.html',
  styleUrls: ['./activity-item-toolbar.component.scss']
}) 
export class ActivityItemToolbarComponent {
@Input() title:string="_title_";

@Input() is_onScanner:boolean=false;
@Output() onScanner = new EventEmitter<any>();

@Input() is_onGoBack:boolean=false;
@Output() onGoBack = new EventEmitter<any>();

@Input() is_onSave:boolean=false;
@Output() onSave = new EventEmitter<any>();

@Input() is_onCancel:boolean=false;
@Output() onCancel = new EventEmitter<any>();

@Input() is_onSendApprove:boolean=false;
@Output() onSendApprove = new EventEmitter<any>();

@Input() is_onApprove:boolean=false;
@Output() onApprove = new EventEmitter<any>();

@Input() is_onCancelApprove:boolean=false;
@Output() onCancelApprove = new EventEmitter<any>();

@Input() is_onCancelWork:boolean=false;
@Output() onCancelWork= new EventEmitter<any>();


}

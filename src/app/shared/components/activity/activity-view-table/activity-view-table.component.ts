import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-view-table',
  templateUrl: './activity-view-table.component.html',
  styleUrls: ['./activity-view-table.component.scss']
})
export class ActivityViewTableComponent {
  @Input() items:any;
  @Input() title:any;

  @Input() is_onView:boolean=false;
  @Output() _onView = new EventEmitter<any>();

  @Input() is_onQRcode:boolean=false; 
  @Output() _onQRcode= new EventEmitter<any>();

}//class

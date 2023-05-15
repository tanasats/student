import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-view-table-item',
  templateUrl: './activity-view-table-item.component.html',
  styleUrls: ['./activity-view-table-item.component.scss']
})
export class ActivityViewTableItemComponent {
  @Input() item:any;
  
  @Input() is_onView:boolean=false; 
  @Output() _onView= new EventEmitter<any>();
  @Input() is_onEdit:boolean=false; 
  @Output() _onEdit= new EventEmitter<any>();
  @Input() is_onDelete:boolean=false; 
  @Output() _onDelete= new EventEmitter<any>();
  @Input() is_onRegister:boolean=false; 
  @Output() _onRegister= new EventEmitter<any>();

  @Input() is_onQRcode:boolean=false; 
  @Output() _onQRcode= new EventEmitter<any>();
}

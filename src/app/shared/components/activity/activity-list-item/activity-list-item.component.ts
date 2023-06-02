import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss']
})
export class ActivityListItemComponent {
  @Input() item:any;
  
  @Input() is_onView:boolean=false; 
  @Output() _onView= new EventEmitter<any>();
  @Input() is_onEdit:boolean=false; 
  @Output() _onEdit= new EventEmitter<any>();
  @Input() is_onDelete:boolean=false; 
  @Output() _onDelete= new EventEmitter<any>();
  @Input() is_onRegister:boolean=false; 
  @Output() _onRegister= new EventEmitter<any>();
  @Input() is_onGear:boolean=false; 
  @Output() _onGear= new EventEmitter<any>();

  @Input() is_onQRcode:boolean=false; 
  @Output() _onQRcode= new EventEmitter<any>();
}

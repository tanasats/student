import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'enroll-list-item',
  templateUrl: './enroll-list-item.component.html',
  styleUrls: ['./enroll-list-item.component.scss']
})
export class EnrollListItemComponent {
  @Input() item:any={};
  @Input() index:any;

  @Input() is_onCheckin:boolean=false;
  @Output() onCheckin = new EventEmitter<any>();
  
  @Input() is_onDelete:boolean=false;
  @Output() onDelete = new EventEmitter<any>();
  
  @Input() is_onGear:boolean=false;
  @Output() onGear = new EventEmitter<any>();

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {
  @Input() items:any;
  @Input() totalItems:any;
  @Input() totalPages:any;
  @Input() currentPage:any;

  @Input() title:any;
  @Output() _onTitleClick = new EventEmitter<any>();

  @Input() is_onCreate:boolean=false;
  @Output() _onCreate = new EventEmitter<any>();


  // @Input() is_onView:boolean=false;
  // @Output() _onView = new EventEmitter<any>();

  // @Input() is_onQRcode:boolean=false; 
  // @Output() _onQRcode= new EventEmitter<any>();

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

  @Input() is_onQRScanner:boolean=false; 
  @Output() _onQRScanner= new EventEmitter<any>();

  @Input() is_onCancel:boolean=false; 
  @Output() _onCancel= new EventEmitter<any>();

  @Output() _onPageChange = new EventEmitter<any>();

  get isEmptyItems():boolean{
    return Object.keys(this.items||{}).length === 0;
  }
}

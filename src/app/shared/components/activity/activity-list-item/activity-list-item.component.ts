import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodayService } from 'src/app/service/today.service';

@Component({
  selector: 'activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss']
})
export class ActivityListItemComponent {
  @Input() item:any;
  @Output() _onTitleClick= new EventEmitter<any>();

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
  
  @Input() is_onCancel:boolean=false; 
  @Output() _onCancel= new EventEmitter<any>();

  @Input() is_onQRcode:boolean=false; 
  @Output() _onQRcode= new EventEmitter<any>();

  @Input() is_onQRScanner:boolean=false; 
  @Output() _onQRScanner= new EventEmitter<any>();

  @Input() is_onTicket:boolean=false; 
  @Output() _onTicket= new EventEmitter<any>();

  constructor(
    private todayservice:TodayService
  ){}

  // get isRegisterExpired():boolean{
  //   return this.todayservice.isExpired(this.item.activity_register_to);
  // }
  // get isRegisterBegin():boolean{
  //   return this.todayservice.isBegin(this.item.activity_register_from);
  // }
  get isBetween():any{
    return this.todayservice.isBetween(this.item.activity_register_from,this.item.activity_register_to);
  }
}

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TodayService } from 'src/app/service/today.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-card1-item',
  templateUrl: './activity-card1-item.component.html',
  styleUrls: ['./activity-card1-item.component.scss']
})
export class ActivityCard1ItemComponent implements OnChanges {
public fileuri=environment.fileuri;

@Input() item:any;
@Output() onJoin = new EventEmitter<any>();

public currentIndex:any;

constructor( private todayservice:TodayService){}

ngOnChanges(){
  this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
}

get isBetween():any{
  return this.todayservice.isBetween(this.item.activity_register_from,this.item.activity_register_to);
}

}

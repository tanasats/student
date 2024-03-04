import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodayService } from 'src/app/service/today.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-card1-item',
  templateUrl: './activity-card1-item.component.html',
  styleUrls: ['./activity-card1-item.component.scss']
})
export class ActivityCard1ItemComponent {
public fileuri=environment.fileuri;
constructor( private todayservice:TodayService){}
@Input() item:any;
@Output() onJoin = new EventEmitter<any>();

get isBetween():any{
  return this.todayservice.isBetween(this.item.activity_register_from,this.item.activity_register_to);
}

}

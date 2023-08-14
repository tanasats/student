import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActivity } from 'src/app/core/interface/activity';
import { TodayService } from 'src/app/service/today.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-card-list-item',
  templateUrl: './activity-card-list-item.component.html',
  styleUrls: ['./activity-card-list-item.component.scss']
})
export class ActivityCardListItemComponent {
  @Input() item!: IActivity;
  @Output() onSelect = new EventEmitter<any>();
  public fileuri=environment.fileuri;

  constructor(private todayservice:TodayService){}

  _onSelect(){
    this.onSelect.emit(this.item);
  }

  get isBetween():number{
    return this.todayservice.isBetween(this.item.activity_register_from,this.item.activity_register_to);
  }
  
} //class

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActivity } from 'src/app/core/interface/activity';

@Component({
  selector: 'app-activity-card-list',
  templateUrl: './activity-card-list.component.html',
  styleUrls: ['./activity-card-list.component.scss']
})
export class ActivityCardListComponent {
  @Input() items!:IActivity[];
  @Output() onSelect = new EventEmitter<any>();

  // _onSelect(item:any){
  //   this.onSelect.emit(item);
  // }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-activity-card1-list',
  templateUrl: './activity-card1-list.component.html',
  styleUrls: ['./activity-card1-list.component.scss']
})
export class ActivityCard1ListComponent {
  @Input() items:any;
  @Output() onJoin = new EventEmitter<any>();

}

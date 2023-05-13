import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-view-details-item',
  templateUrl: './activity-view-details-item.component.html',
  styleUrls: ['./activity-view-details-item.component.scss']
})
export class ActivityViewDetailsItemComponent {
  @Input() item:any;
  @Output() _onView = new EventEmitter<any>();
  @Output() _onEdit = new EventEmitter<any>();
  @Output() _onDelete = new EventEmitter<any>();


}// class

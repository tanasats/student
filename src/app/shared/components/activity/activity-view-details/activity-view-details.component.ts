import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'activity-view-details',
  templateUrl: './activity-view-details.component.html',
  styleUrls: ['./activity-view-details.component.scss']
})
export class ActivityViewDetailsComponent {
  @Input() items:any;
  @Output() _onView = new EventEmitter<any>();
  @Output() _onEdit = new EventEmitter<any>();
  @Output() _onDelete = new EventEmitter<any>();

  constructor(
    private router:Router,
  ){}

}//class

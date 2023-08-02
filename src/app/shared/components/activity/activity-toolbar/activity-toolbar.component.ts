import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-toolbar',
  templateUrl: './activity-toolbar.component.html',
  styleUrls: ['./activity-toolbar.component.scss']
})
export class ActivityToolbarComponent {
@Input() title:string="_activity_toolbars_"
@Output() onCreate = new EventEmitter<any>();
}

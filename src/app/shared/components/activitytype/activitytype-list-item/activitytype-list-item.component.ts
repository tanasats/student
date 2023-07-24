import { Component, Input } from '@angular/core';

@Component({
  selector: 'activitytype-list-item',
  templateUrl: './activitytype-list-item.component.html',
  styleUrls: ['./activitytype-list-item.component.scss']
})
export class ActivitytypeListItemComponent {
  @Input()  item:any;
}

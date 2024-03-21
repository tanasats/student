import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss']
})
export class ActivityHeaderComponent {
  @Input() item:any;
}

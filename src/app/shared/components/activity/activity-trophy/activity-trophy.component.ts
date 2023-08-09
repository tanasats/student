import { Component, Input } from '@angular/core';

@Component({
  selector: 'activity-trophy',
  templateUrl: './activity-trophy.component.html',
  styleUrls: ['./activity-trophy.component.scss']
})
export class ActivityTrophyComponent {
@Input() items:any;

}

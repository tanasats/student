import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'activity-info-item',
  templateUrl: './activity-info-item.component.html',
  styleUrls: ['./activity-info-item.component.scss'],
})
export class ActivityInfoItemComponent {
  public fileuri = environment.fileuri;
  @Input() item?: any = {};
}

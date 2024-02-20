import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-card1-item',
  templateUrl: './activity-card1-item.component.html',
  styleUrls: ['./activity-card1-item.component.scss']
})
export class ActivityCard1ItemComponent {
public fileuri=environment.fileuri;

@Input() item:any;
@Output() onJoin = new EventEmitter<any>();

}

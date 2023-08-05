import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActivity } from 'src/app/core/interface/activity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-card-list-item',
  templateUrl: './activity-card-list-item.component.html',
  styleUrls: ['./activity-card-list-item.component.scss']
})
export class ActivityCardListItemComponent {
  @Input() item!: IActivity;
  @Output() onSelect = new EventEmitter<any>();
  public fileuri=environment.fileuri;

  _onSelect(){
    this.onSelect.emit(this.item);
  }
} //class

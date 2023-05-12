import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-activity-card-list',
  templateUrl: './activity-card-list.component.html',
  styleUrls: ['./activity-card-list.component.scss']
})
export class ActivityCardListComponent {
  @Input() items:any[]=[];
  @Output() onSelect = new EventEmitter<any>();

  _onSelect(item:any){
    //var target = event.target || event.srcElement || event.currentTarget;
    //console.log(target);
    this.onSelect.emit(item);
  }
}

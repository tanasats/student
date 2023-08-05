import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APPLABEL } from 'src/environments/environment';

@Component({
  selector: 'user-view-table-item',
  templateUrl: './user-view-table-item.component.html',
  styleUrls: ['./user-view-table-item.component.scss']
})
export class UserViewTableItemComponent {
@Input() item:any;
@Input() index:any;

@Input() is_onDelete:boolean=false;
@Output() onDelete = new EventEmitter<any>();


}

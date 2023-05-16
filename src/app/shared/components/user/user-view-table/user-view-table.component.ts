import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-view-table',
  templateUrl: './user-view-table.component.html',
  styleUrls: ['./user-view-table.component.scss']
})
export class UserViewTableComponent {
@Input() items:any;
@Input() title:any;

}

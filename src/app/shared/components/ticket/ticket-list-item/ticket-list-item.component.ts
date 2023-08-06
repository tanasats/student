import { Component, Input } from '@angular/core';

@Component({
  selector: 'ticket-list-item',
  templateUrl: './ticket-list-item.component.html',
  styleUrls: ['./ticket-list-item.component.scss']
})
export class TicketListItemComponent {
@Input() item:any={};
@Input() itemnumber:number=0;
 
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent {
@Input() items:any; 
@Output() _onEdit = new EventEmitter<any>();
@Output() _onDelete = new EventEmitter<any>();

public page_number=0;
public page_limit=10;

get first_index(){
  return (this.page_number==0)?1:(this.page_number*this.page_limit)+1;
}

get last_index(){
  return ((this.first_index+this.page_limit<=(this.items.length+1))
          ?(this.first_index+this.page_limit)
          :(((this.items.length)%(this.page_limit))+this.first_index))-1;
}

get page_total(){
  return Math.ceil(this.items.length/this.page_limit)
}

get isNextDisabled():boolean{
  return this.last_index >= this.items.length;
}

get isPrevDisabled():boolean{
  return this.first_index<=1;
}

}

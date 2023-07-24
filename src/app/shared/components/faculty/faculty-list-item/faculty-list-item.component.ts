import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'faculty-list-item',
  templateUrl: './faculty-list-item.component.html',
  styleUrls: ['./faculty-list-item.component.scss']
})
export class FacultyListItemComponent {
@Input() item:any; 
@Input() isMoreOption:boolean=false;
@Output() _onEdit = new EventEmitter<any>();
@Output() _onDelete = new EventEmitter<any>();


test(){
  console.log("test123")
}
}
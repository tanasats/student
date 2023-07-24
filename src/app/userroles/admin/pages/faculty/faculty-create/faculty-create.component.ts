import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.scss']
})
export class FacultyCreateComponent {
  @Input() isCreate:boolean=false;
  @Input() fc:any;
  @Output() _onSubmit = new EventEmitter<any>();
  @Output() _onCancel = new EventEmitter<any>();
  
  public faculty_group = APPCONST.FACULTY_GROUP;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.scss']
})
export class FacultyEditComponent {
  @Input() fc:any;
  @Output() _onSubmit = new EventEmitter<any>();
  @Output() _onCancel = new EventEmitter<any>();
  
  public faculty_group = APPCONST.FACULTY_GROUP;
}

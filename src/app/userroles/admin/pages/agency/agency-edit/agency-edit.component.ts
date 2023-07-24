import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacultyService } from 'src/app/service/faculty.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss'],
})
export class AgencyEditComponent {
  @Input() fc: any;

  @Output() _onSubmit = new EventEmitter<any>();
  @Output() _onCancel = new EventEmitter<any>();  
  
  public faculty_ref:any;

  constructor(
    private toaster: ToasterService,
    private facultyservice:FacultyService) {
      this.loadData_ref();
    }

  loadData_ref(){
    this.facultyservice.getall().subscribe({
     next: (res) => {
       this.faculty_ref = res.map((item: any) => {
         var obj: any = {};
         obj.id = JSON.stringify(item); //item.faculty_id;
         obj.name = item.faculty_id + ' : ' + item.faculty_name;
         return obj;
       });
     },
     error: (err) => {
       console.log(err);
     },
   });
  }
}

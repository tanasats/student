import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacultyService } from 'src/app/service/faculty.service';

@Component({
  selector: 'agency-create',
  templateUrl: './agency-create.component.html',
  styleUrls: ['./agency-create.component.scss']
})
export class AgencyCreateComponent {
@Input() isCreate:boolean=false;
@Input() fc:any;
@Input() refdata:any;
@Output() _onSubmit = new EventEmitter<any>();
@Output() _onCancel = new EventEmitter<any>();
//public item:any;

public faculty_ref:any;

constructor(
  private facultyservice:FacultyService
){
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

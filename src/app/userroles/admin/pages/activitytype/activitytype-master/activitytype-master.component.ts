import { Component } from '@angular/core';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-activitytype-master',
  templateUrl: './activitytype-master.component.html',
  styleUrls: ['./activitytype-master.component.scss']
})
export class ActivitytypeMasterComponent {
  public items:any;
  constructor(
    private acttypeservice:ActivitytypeService,
    private toaster:ToasterService
  ){
    this.acttypeservice.getall().subscribe({
      next:(res)=>{
        console.log("agency res:",res);
        this.items=res;
      },
      error:(err)=>{
        this.toaster.show("error",err);
      }
    })
  }
}

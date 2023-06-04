import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActivityFormGroup } from 'src/app/core/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { AgencyService } from 'src/app/service/agency.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {
  public id:any;
  public state: any;
  public item:any;
  
  public form:FormGroup;
  public faculty_ref:any;
  public agency_ref:any;
  public activitytype_ref:any;

  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    public offcanvas:OffcanvasService,
    
    private activityservice:ActivityService,
    private facultyservice:FacultyService,
    private agencyservice:AgencyService,
    private activitytypeservice:ActivitytypeService,
    private toaster:ToasterService
    
  ){
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [null, [Validators.required]],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],     
      agency_code:[null, [Validators.required]],
      activitytype_code:  [null, [Validators.required]], 
      activity_name: [null, [Validators.required]],      
      activity_description: [null, []],
      activity_date_from: [null, []],
      activity_date_to:[null,[]],
      activity_place: [null, []],
      activity_hour: [null,[]],
      activity_receive: [null, []],
      activity_faculty:[null,[]],
      activity_picture: [null, []],
      activity_status: [null, []],
      activity_budget_source: [null, []],
      activity_budget: [null, []],
      activity_budget_paid: [null, []],
    }) as unknown as IActivityFormGroup;
  }//constructor

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.state = history.state;
    this.item = history.state.datas;
    this._load_ref_data();
    

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.faculty_ref=this.item.activity_faculty;
    this.form.patchValue(this.item);
   
    //this.form.controls['activity_date_from'].setValue(this.item.activity_date_from.substr(0,10))
    //this.form.controls['activity_date_to'].setValue(this.item.activity_date_to.substr(0,10))
    
    //this.form.controls['activity_date_from'].setValue('')
    

  }
  _load_ref_data(){
    this.facultyservice.getall().subscribe({
      next:(res) => {
        // console.log("facluty: ",res);
        this.faculty_ref=res;
      },
      error:(err) =>{
        console.log("faculty api failed!!");
      }
    });
    this.agencyservice.getall().subscribe({
      next: (res) => {
        this.agency_ref = res.map((item: any)=>{ 
          var obj:any = {}
          obj.id = item.agency_code;
          obj.name=item.agency_code+" : "+item.agency_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });    
    this.activitytypeservice.getall().subscribe({
      next: (res) => {
        this.activitytype_ref = res.map((item: any)=>{ 
          var obj:any = {}
          obj.id = item.activitytype_code;
          obj.name=item.activitytype_code+" : "+item.activitytype_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });     
  }
  _onSubmit(){
    let datas = this.form.getRawValue();
    datas.activity_faculty = JSON.stringify(datas.activity_faculty);

    this.activityservice.update(datas).subscribe({
      next:(res)=>{
        console.log("update activity res:",res);
        this.toaster.show("success","บันทึกข้อมูลเรียบร้อย");
      },
      error:(err)=>{
        console.log("update activity err:",err);
        this.toaster.show("error","ผิดพลาด! "+err);
      }
    })
  }
  _onCancle(){

  }
}

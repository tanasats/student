import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IActivity, IActivityFormGroup } from 'src/app/core/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit,OnDestroy   {
  //public items:IActivity[]=[];
  public form:FormGroup;

  editor: Editor | undefined;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  htmlContent = 'xxx';

  public offcanvas_faculty="offcanvas_faculty";
  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Peter'},
    { id: 4, name: 'Michael' },
    { id: 5, name: 'Jane' },
];
activity_type = [
  { id: 1, name: 'กิจกรรมประเภทที่ 1' },
  { id: 2, name: 'กิจกรรมประเภทที่ 2' },
  { id: 3, name: 'กิจกรรมประเภทที่ 3'},
  { id: 4, name: 'กิจกรรมประเภทที่ 4' },
  { id: 5, name: 'กิจกรรมประเภทที่ 5' },
];
agency = [
  { id: 1, name: 'หน่วยงาน/องค์กร 1' },
  { id: 2, name: 'หน่วยงาน/องค์กร 2' },
  { id: 3, name: 'หน่วยงาน/องค์กร 3'},
  { id: 4, name: 'หน่วยงาน/องค์กร 4' },
  { id: 5, name: 'หน่วยงาน/องค์กร 5' },
];
faculty_ref = [
  { faculty_id: 1, faculty_name: 'คณะ 1',selected:false },
  { faculty_id: 2, faculty_name: 'คณะ 2',selected:false  },
  { faculty_id: 3, faculty_name: 'คณะ 3',selected:false },
  { faculty_id: 4, faculty_name: 'คณะ 4',selected:false  },
  { faculty_id: 5, faculty_name: 'คณะ 5',selected:false  },
];
faculty_list:any[]=[];

selectedCityId?: number;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public offcanvas:OffcanvasService,
    public toaster:ToasterService,
    private facultyservice:FacultyService,
    private activityservice:ActivityService,
  ){
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [66, [Validators.required]],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],     
      agency_id:[null, [Validators.required]],
      activitytype_id:  [null, [Validators.required]], 
      activity_name: [null, [Validators.required]],      
      activity_description: [null, [Validators.required]],
      activity_date: [null, [Validators.required]],
      activity_place: [null, [Validators.required]],
      activity_receive: [null, [Validators.required]],
      activity_faculty:[null,[Validators.required]],
      activity_picture: [null, []],
      activity_status: [null, []],
      activity_budget_source: [null, [Validators.required]],
      activity_budget: [null, [Validators.required]],
      activity_budget_paid: [null, [Validators.required]],
    }) as unknown as IActivityFormGroup;
  }
  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  ngOnInit(): void {
    this._load_ref_data();
    this.editor = new Editor();
  }

  // get fc():any{
  //   return this.form.controls['agency_id'];
  // }

  _load_ref_data(){
    this.facultyservice.getall().subscribe({
      next:(res) => {
        this.faculty_ref=res;
      },
      error:(err) =>{
        console.log("faculty api failed!!");
      }
    })
  }

  _onCancle(){
    this.router.navigate(["admin/activity"]);
  }
  _genActivityCode(){
    let y =this.form.controls["activity_year"].value.toString();
    this.form.controls["activity_code"].setValue(y.substr(-2));
  }



  _cancle(){
    this.form.markAsUntouched();
    this.router.navigate(['/admin/activity']);
  }
  _onfacultySelectSave(items:any){
    this.form.controls['activity_faculty'].setValue(items);
  }

  _submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      let datas = this.form.getRawValue();
      datas.activity_faculty=JSON.stringify(datas.activity_faculty);
      this.activityservice.create(datas).subscribe({
        next:(res)=>{
          console.log("activity service res:",res);
          if(res.affectedRows){ //affectedRows,insertId
            this.toaster.show("success","ยันทึกข้อมูลเรียบร้อย");
            this.router.navigate(['../../']);
          }
          
        },
        error:(err)=>{
          console.log("activity service err:",err);
        }
      });
      
    }else{
      this.toaster.show("error","กรุณากรอกข้อมูลให้ครบถ้วน")
    }
  }


goBack(){
  this.router.navigate(['/admin/activity']);
}

} // class

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IActivityFormGroup } from 'src/app/core/interface/activity';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { ActivityService } from 'src/app/service/activity.service';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { AgencyService } from 'src/app/service/agency.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { DocfileService } from 'src/app/service/docfile.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { UserService } from 'src/app/service/user.service';
import { DialogInfoConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-info-confirm/dialog-info-confirm.component';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {
  public id: any;
  public state: any;
  public item: any;

  public form: FormGroup;
  public faculty_ref: any;
  public agency_ref: any;
  public activitytype_ref: any;
  public docfile_list: any = [];
  public currentuser!: ICurrentuser;
  public agency_text:string="";
  public activitytype_text:string="";

  public cowner:any;
  public cdate:any;
  
  public cowner_data?:any;
  public mowner_data?:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    
    private activityservice: ActivityService,
    private facultyservice: FacultyService,
    private agencyservice: AgencyService,
    private activitytypeservice: ActivitytypeService,
    private currentuserservice: CurrentUserService,
    private docfileservice: DocfileService,
    private toaster: ToasterService,
    private dialog: MatDialog,


    public offcanvas: OffcanvasService,
    public userservice:UserService,
  ) {
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [null, []],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],
      activity_seq_term: [null, [Validators.required]],
      agency_code: [null, [Validators.required]],
      activitytype_code: [null, [Validators.required]],
      activity_name: [null, [Validators.required]],
      activity_description: [null, []],
      activity_date_from: [null, []],
      activity_date_to: [null, []],
      activity_register_from: [null, []],
      activity_register_to: [null, []],      
      activity_place: [null, []],
      activity_hour: [null, []],
      activity_receive: [null, []],
      activity_skill: [APPCONST.SKILL, []],
      activity_faculty: [null, []],
      activity_picture: [null, []],
      activity_status: ['d', []],
      activity_budget_source: [null, []],
      activity_budget: [null, []],
      activity_budget_paid: [null, []],
      //activity_docfiles: [null, []],
      //cowner: [null, []],
      mowner: [null, []],
      mdate: [null,[]]
      
    }) as unknown as IActivityFormGroup;
  } //constructor

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas; 
    this._load_ref_data();

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.faculty_ref = this.item.activity_faculty;
    this.item.activity_skill = JSON.parse(this.item.activity_skill);
    this.cowner=this.item.cowner;
    this.cdate=this.item.cdate;
    this.form.patchValue(this.item);

    console.log('item:', this.item);
    //this.form.controls['activity_date_from'].setValue(this.item.activity_date_from.substr(0,10))
    //this.form.controls['activity_date_to'].setValue(this.item.activity_date_to.substr(0,10))

    //this.form.controls['activity_date_from'].setValue('')
  }

  ngAfterContentInit() {
    this.currentuser = this.currentuserservice.getdata;
    this._load_docfile();
  }

  loadData() {
    
    this.activityservice.getbyid(this.id).subscribe({
      next: ([res]) => {
        this.item = res;
        this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
        this.faculty_ref = this.item.activity_faculty;
        this.item.activity_skill = JSON.parse(this.item.activity_skill);
        
        this.form.patchValue(this.item);
      },
      error: (err) => {
        console.log('activity-edit loadData() err:', err);
      },
    });
  }

  _load_ref_data() {
    this.facultyservice.getall().subscribe({
      next: (res) => {
        // console.log("facluty: ",res);
        this.faculty_ref = res;
      },
      error: (err) => {
        console.log('faculty api failed!!');
      },
    });

    this.agencyservice.getall().subscribe({
      next: (res) => {
        this.agency_ref = res.map((item: any) => {
          var obj: any = {};
          obj.id = item.agency_code;
          obj.name = item.agency_code + ' : ' + item.agency_name;
          if(item.agency_code==this.item.agency_code) this.agency_text=item.agency_code+":"+item.agency_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.activitytypeservice.getall().subscribe({
      next: (res) => {
        this.activitytype_ref = res.map((item: any) => {
          var obj: any = {};
          obj.id = item.activitytype_code;
          obj.name = item.activitytype_code + ' : ' + item.activitytype_name;
          if(item.activitytype_code==this.item.activitytype_code) this.activitytype_text=item.activitytype_code+":"+item.activitytype_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.userservice.getbyid(this.item.cowner).subscribe({
      next: ([res]) =>{
        console.log("cowner:",res);
        this.cowner_data=res;
      },
      error: (err) =>{
        console.log("cowner:err:",err);
      }
    })

    this.userservice.getbyid(this.item.mowner).subscribe({
      next: ([res]) =>{
        console.log("mowner:",res);
        this.mowner_data=res;
      },
      error: (err) =>{
        console.log("mowner:err:",err);
      }
    })

  }

  _onFileSave(event: any) {
    console.log('onfileSave event:', event);
    if (event) {
      this._load_docfile();
    }
  }

  _load_docfile() {
    this.currentuser = this.currentuserservice.getdata;
    this.docfileservice
      .getbytable(
        'activity',
        this.form.controls['activity_id'].value,
        this.item.cowner
      )
      .subscribe({
        next: (res) => {
          console.log('load_docfile res:', res);
          this.docfile_list = res;
        },
        error: (err) => {
          console.log('load_docfile err:', err);
        },
      });
  }

  onSubmit() {
    let datas = this.form.getRawValue();
    datas.activity_faculty = JSON.stringify(datas.activity_faculty);
    datas.activity_skill = JSON.stringify(datas.activity_skill);

    this.activityservice.update(datas).subscribe({
      next: (res) => {
        console.log('update activity res:', res);
        this.toaster.show('success', 'บันทึกข้อมูลเรียบร้อย');
      },
      error: (err) => {
        console.log('update activity err:', err);
        this.toaster.show('error', 'ผิดพลาด! ' + err);
      },
    });
  }

  onCancel() {
    this.form.markAsUntouched();
    this.router.navigate(['/admin/activity']);
  }

  onImageSave(filename: any) {
    console.log('onImageSave file: ',filename);
    const datas = {
      activity_id: this.form.controls['activity_id'].value,
      activity_picture: filename,
    };
    this.activityservice.update(datas).subscribe({
      next: (res) => {
        console.log('activity picture res:', res);
        this.loadData();
      },
      error: (err) => {
        console.log('activity picure err:', err);
      },
    });
  }


  onSendApprove(item:any){
    this.dialog
    .open(DialogInfoConfirmComponent, {
      data: {
        title: 'ยืนยันส่งคำขออนุมัติ',
        description: 'กิจกรรม: '+item.activity_name,
      },
    })
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        console.log(data);
        this.form.controls['activity_status'].setValue('a');
        this.onSubmit();
        this.router.navigate(['/admin/activity']);
      }
    });   
  }

  onApprove(item:any){
    this.dialog
    .open(DialogInfoConfirmComponent, {
      data: {
        title: 'อนุมัติกิจกรรม',
        description: 'กิจกรรม: '+item.activity_name,
      },
    })
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        console.log(data);
        this.form.controls['activity_status'].setValue('w');
        this.onSubmit();
        this.router.navigate(['/admin/activity']);
      }
    });   
  }

  onCancelApprove(item:any){
    this.dialog
    .open(DialogWarningConfirmComponent, {
      data: {
        title: 'ยกเลิกคำขออนุมัติ',
        description: 'กิจกรรม: '+item.activity_name,
      },
    })
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        console.log(data);
        this.form.controls['activity_status'].setValue('d');
        this.onSubmit();
        this.router.navigate(['/admin/activity']);
      }
    });   
  }

  onGoBack(){
    this.router.navigate(['/admin/activity']);
  }


}

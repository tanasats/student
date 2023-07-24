import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IActivityFormGroup, ICurrentuser } from 'src/app/core/interface';
import { ActivityService } from 'src/app/service/activity.service';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { AgencyService } from 'src/app/service/agency.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { DocfileService } from 'src/app/service/docfile.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent {
  public form: FormGroup;
  public agency_ref: any;
  public activitytype_ref: any;
  public currentuser!: ICurrentuser;
  public docfile_list:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private currentuserservice: CurrentUserService,
    private activityservice: ActivityService,
    private agencyservice: AgencyService,
    private docfileservice: DocfileService,
    private activitytypeservice: ActivitytypeService,
    public offcanvas: OffcanvasService,
    public toaster: ToasterService
  ){
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [null, []],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],
      activity_seq_term: [null, []],
      agency_code: [null, [Validators.required]],
      activitytype_code: [null, [Validators.required]],
      activity_name: [null, [Validators.required]],
      activity_description: [null, [Validators.required]],
      activity_date_from: [null, []],
      activity_date_to: [null, []],
      activity_place: [null, []],
      activity_hour: [null, []],
      activity_receive: [null, []],
      activity_faculty: [null, []],
      activity_picture: [null, []],
      activity_status: [null, []],
      activity_budget_source: [null, []],
      activity_budget: [null, []],
      activity_budget_paid: [null, []],
      //activity_docfiles: [null, []],
      cowner: [null, []],
      mowner: [null, []],
    }) as unknown as IActivityFormGroup;
  }

  ngOnInit(): void {
    this._load_ref_data();
  }
  ngAfterContentInit(){
    this.currentuser = this.currentuserservice.getdata;
  }

  _load_ref_data() {
    this.agencyservice.getall().subscribe({
      next: (res) => {
        this.agency_ref = res.map((item: any) => {
          var obj: any = {};
          obj.id = item.agency_code;
          obj.name = item.agency_code + ' : ' + item.agency_name;
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
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }  




  _onSubmit(){

  }

  _onCancel(){

  }

  _onFileSave(evnet:any){

  }



}

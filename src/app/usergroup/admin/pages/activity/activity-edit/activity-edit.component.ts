import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActivityFormGroup } from 'src/app/core/interface/activity';
import { OffcanvasService } from 'src/app/service/offcanvas.service';

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
  ){
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [null, [Validators.required]],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],     
      agency_code:[null, [Validators.required]],
      activitytype_code:  [null, [Validators.required]], 
      activity_name: [null, [Validators.required]],      
      activity_description: [null, [Validators.required]],
      activity_date_form: [null, [Validators.required]],
      activity_date_to:[null,[Validators.required]],
      activity_place: [null, [Validators.required]],
      activity_hour: [null,[Validators.required]],
      activity_receive: [null, [Validators.required]],
      activity_faculty:[null,[Validators.required]],
      activity_picture: [null, []],
      activity_status: [null, []],
      activity_budget_source: [null, [Validators.required]],
      activity_budget: [null, [Validators.required]],
      activity_budget_paid: [null, [Validators.required]],
    }) as unknown as IActivityFormGroup;
  }//constructor

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.state = history.state;
    this.item = history.state.datas;

    this.form.patchValue(this.item);
  }

  _submit(){

  }
  _cancle(){

  }
}

import { AbstractControl,FormGroup } from "@angular/forms";
export interface IActivity {
    activity_id:number,
    activity_code:string,
    activity_year:number,
    activity_term:number,
    activity_seq_term:number,
    agency_code:string,
    activitytype_code:string,
    activity_name:string,
    activity_description:string,
    activity_date_form:string,
    activity_date_to:string,
    activity_hour:number,
    activity_place:string,
    activity_receive:number,
    activity_register:number,
    activity_faculty:string,
    activity_picture:string,
    activity_budget_source:string,
    activity_budget:number,
    activity_budget_paid:number,
    activity_owner:string,
    activity_register_online:string,
    activity_register_date_form:string,
    activity_register_date_to:string,
    activity_status:string,
    cdate:string,
    mdate:string,
    
    // activity_id:number,
    // activity_code:string,
    // activity_name:string,
    // activity_description:string,
    // activity_year:number,
    // activity_term:number,
    // agency_id:number,             //องค์กรที่จัดกิจกรรม
    // cdate:string,
    // mdate:string
}
export interface IActivityFormGroup extends FormGroup{
    value: IActivity;
    controls:{
        activity_id:AbstractControl,
        activity_code:AbstractControl,
        activity_year:AbstractControl,
        activity_term:AbstractControl,
        activity_seq_term:AbstractControl,
        agency_code:AbstractControl,
        activitytype_code:AbstractControl,
        activity_name:AbstractControl,
        activity_description:AbstractControl,
        activity_date_form:AbstractControl,
        activity_date_to:AbstractControl,
        activity_hour:AbstractControl,
        activity_place:AbstractControl,
        activity_receive:AbstractControl,
        activity_register:AbstractControl,
        activity_faculty:AbstractControl,
        activity_picture:AbstractControl,
        activity_budget_source:AbstractControl,
        activity_budget:AbstractControl,
        activity_budget_paid:AbstractControl,
        activity_owner:AbstractControl,
        activity_register_online:AbstractControl,
        activity_register_date_form:AbstractControl,
        activity_register_date_to:AbstractControl,
        activity_status:AbstractControl,
        cdate:AbstractControl,
        mdate:AbstractControl,



        // activity_id:AbstractControl;
        // activity_code:AbstractControl,
        // activity_name:AbstractControl,
        // activity_description:AbstractControl,
  
        // activity_year:AbstractControl,
        // activity_term:AbstractControl,
        // agency_id:AbstractControl,
        
        // cdate:AbstractControl,
        // mdate:AbstractControl
    }
}

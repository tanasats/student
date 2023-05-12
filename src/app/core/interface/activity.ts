import { AbstractControl,FormGroup } from "@angular/forms";
export interface IActivity {
    activity_id:number,
    activity_code:string,
    activity_name:string,
    activity_description:string,

    activity_year:number,
    activity_term:number,
    agency_id:number,             //องค์กรที่จัดกิจกรรม

    cdate:string,
    mdate:string
}
export interface IActivityFormGroup extends FormGroup{
    value: IActivity;
    controls:{
        activity_id:AbstractControl;
        activity_code:AbstractControl,
        activity_name:AbstractControl,
        activity_description:AbstractControl,
  
        activity_year:AbstractControl,
        activity_term:AbstractControl,
        agency_id:AbstractControl,
        
        cdate:AbstractControl,
        mdate:AbstractControl
    }
}

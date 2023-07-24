import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-enroll-student-confirm',
  templateUrl: './dialog-enroll-student-confirm.component.html',
  styleUrls: ['./dialog-enroll-student-confirm.component.scss']
})
export class DialogEnrollStudentConfirmComponent {
  public fg:FormGroup;
  public items:any[]=[
    {id:"A",name:"ผู้รับผิดชอบโครงการ"},
    {id:"B",name:"ผู้ดำเนินโครงการ"},
    {id:"C",name:"ผู้เข้าร่วมกิจกรรม"},
  ]
  constructor(
    private fb:FormBuilder,
    private dialogRef:MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)public data: any
    ) { 
      
    this.fg=fb.group({
      user_id : data.user_id,
      activity_id: data.activity_id,
      studentcode: data.studentcode,
      enroll_position: [null,[Validators.required]]
      //file_description: [data.file_description||data.file_name,Validators.required]
    })
  }

  ngOnInit(): void {

  }

  _close(){
    this.dialogRef.close(false);
  }

  _save(){
    console.log(this.fg.getRawValue());
    if (this.fg.valid) {
      this.dialogRef.close(this.fg.value);
    }
  }

  get is_form_valid():boolean{
    return this.fg.invalid;
  }

  // get validateClass(): any {
  //   return {
  //     'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
  //   }
  // } 

}

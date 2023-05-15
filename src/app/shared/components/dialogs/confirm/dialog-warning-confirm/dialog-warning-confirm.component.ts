import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-warning-confirm',
  templateUrl: './dialog-warning-confirm.component.html',
  styleUrls: ['./dialog-warning-confirm.component.scss']
})
export class DialogWarningConfirmComponent {
  public title:string="ยืนยัน";
  public yes:string = 'ยืนยัน';
  public no:string = 'ยกเลิก';
  public description:string="คุณต้องการยืนยันการดำเนินการนี้ใช่หรือไม่";
  constructor( private dialogRef:MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)public data: any) { 
      if(data?.title)this.title=data.title;
      if(data?.description)this.description=data.description;
      if(data?.yes)this.yes=data.yes;
      if(data?.no)this.no=data.no;
    }

  _close(){
    this.dialogRef.close(false);
  }
  _confirm(){
    this.dialogRef.close(true);
  }

}

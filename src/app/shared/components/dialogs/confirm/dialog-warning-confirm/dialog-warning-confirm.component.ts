import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-warning-confirm',
  templateUrl: './dialog-warning-confirm.component.html',
  styleUrls: ['./dialog-warning-confirm.component.scss']
})
export class DialogWarningConfirmComponent {
  public icon:string='bi-exclamation-triangle';
  public title:string="แจ้งเตือนให้ยืนยัน";
  public yes:string = 'ยืนยัน';
  public no:string = 'ปฎิเสธ';
  public description:string="คุณต้องการยืนยัน เพื่อดำเนินการนี้ใช่หรือไม่";
 

  constructor( private dialogRef:MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)public data: any) { 
      if(data?.icon)this.icon=data.icon;
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

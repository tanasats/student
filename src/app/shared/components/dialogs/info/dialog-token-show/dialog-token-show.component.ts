import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-token-show',
  templateUrl: './dialog-token-show.component.html',
  styleUrls: ['./dialog-token-show.component.scss'],
})
export class DialogTokenShowComponent {
  public title:string="ยืนยัน";
  public yes:string = 'ยืนยัน';
  public no:string = 'ยกเลิก';
  public description:string="คุณต้องการยืนยันการดำเนินการนี้ใช่หรือไม่";
  public qrcode="xxxxx";
  public enroll_token!:string;

  constructor( private dialogRef:MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)public data: any) { 
      if(data?.title)this.title=data.title;
      if(data?.description)this.description=data.description;
      if(data?.enroll_token) this.enroll_token=data.enroll_token;
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

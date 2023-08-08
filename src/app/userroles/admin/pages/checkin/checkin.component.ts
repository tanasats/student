import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { CheckinService } from 'src/app/service/checkin.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent {
  scannerEnabled = true
  allowedFormats = [ BarcodeFormat.QR_CODE ];
  qrResultString: any;


  checkinlist:any[]=[];

  constructor(
    private enrollservice:EnrollService,
    private checkinservice:CheckinService,
    private toaster:ToasterService,
  ){ }
 



  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    
    if(this.qrResultString != resultString){
      
      this.qrResultString = resultString;
      this.checkinservice.checkin(this.qrResultString).subscribe({
        next: ([row]) => {
          this.checkinlist.unshift({studentcode:row.studentcode, activity_checkin_date:row.activity_checkin_date})
          this.toaster.show("success",row.studentcode+" เข้าร่วม")
        },
        error: (err) => {
          console.log(err);
          this.toaster.show("error","เกิดข้อผิดพลาด !");
        }
      })
    }

  }

}

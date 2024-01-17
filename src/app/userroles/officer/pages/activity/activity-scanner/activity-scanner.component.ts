import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { CheckinService } from 'src/app/service/checkin.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-activity-scanner',
  templateUrl: './activity-scanner.component.html',
  styleUrls: ['./activity-scanner.component.scss'],
})
export class ActivityScannerComponent {
  public id: any;
  public state: any;
  public item: any;
  public checkinlist:any[]=[];


  scannerEnabled = true;
  allowedFormats = [BarcodeFormat.QR_CODE];
  qrResultString: any;

 

  constructor(
    private route: ActivatedRoute,
    private checkinservice:CheckinService,
    private toaster:ToasterService,
    //private activityservice:ActivityService,
    ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    
    if(this.qrResultString != resultString){
      
      this.qrResultString = resultString;
      this.checkinservice.checkin(this.id,this.qrResultString).subscribe({
        next: ([row]) => {
          this.checkinlist.unshift({studentcode:row.studentcode, studentname:row.studentname, activity_checkin_date:row.activity_checkin_date})
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

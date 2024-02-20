import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ActivityService } from 'src/app/service/activity.service';
import { CheckinService } from 'src/app/service/checkin.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent {

  public items: any; 
  public items_d:any;
  public items_a:any;
  public items_w:any;

  public totalItems: any;
  public totalPages: any;

  //public pageitems:any; //totalItems: 24, totalPages: 5, currentPage: 1, items:[]
  public currentPage:any=1;
  public pagelimit: number=10;
  public keyword:string='';
  public activity_id:number=98;


  scannerEnabled = false;
  allowedFormats = [ BarcodeFormat.QR_CODE ];
  qrResultString: any;


  checkinlist:any[]=[];





  constructor(
    private enrollservice:EnrollService,
    private checkinservice:CheckinService,
    private toaster:ToasterService,
    private activityservice:ActivityService,
  ){ 
    this._loadItem();
  }
 


 
  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    
    if(this.qrResultString != resultString){
      
      this.qrResultString = resultString;
      this.checkinservice.checkin(98,this.qrResultString).subscribe({
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


  _loadItem() {

    this.activityservice.filter({page:this.currentPage,limit:this.pagelimit}).subscribe({
      next: (res) => {
        console.log(res);
        this.totalItems = res.totalItems;
        this.totalPages = res.totalPages;
        this.currentPage=res.currentPage;        
        this.items = res.items;
        
        this.items_d = res.items.filter((item:any)=>{return item.activity_status=='d'});
        this.items_a = res.items.filter((item:any)=>{return item.activity_status=='a'});
        this.items_w = res.items.filter((item:any)=>{return item.activity_status=='w'});

        //this.items = res;
      },
      error: (err) => {
        this.toaster.show("error",err);
        console.log(err);
      },
    });    
  }




}

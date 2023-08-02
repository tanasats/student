import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  public id:any;
  public state:any;
  public item:any;

  constructor(
    private activeroute:ActivatedRoute,
    private router:Router,
    private activityservice:ActivityService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ){}

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas; 
  }

  onCancelApprove(event:any){
    this.dialog
    .open(DialogWarningConfirmComponent, {
      data: {
        title: 'ยืนยันยกเลิกอนุมัติ',
        description: 'กิจกรรม: '+this.item.activity_name,
      },
    })
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        console.log(data);
        const datas = {
          "activity_id":this.item.activity_id,
          "activity_status":"d"
        }
        this.activityservice.update(datas).subscribe({
          next: (res)=>{
            console.log(res);
            this.toaster.show("success",res);
            this.router.navigate(['/officer/activity']);
          },
          error: (err)=>{
            console.log(err);
            this.toaster.show("error",err);
          }
        })


      }
    });   
  }

  onGoBack(event:any){
    if(event){
      this.router.navigate(['/officer/activity']);
    }
  }


}

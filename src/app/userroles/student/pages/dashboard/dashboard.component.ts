import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { ActivityService } from 'src/app/service/activity.service';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogTokenShowComponent } from 'src/app/shared/components/dialogs/info/dialog-token-show/dialog-token-show.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public title?: string;
  public items: any;
 // public me: any;
  public currentuser:ICurrentuser;
  public userdata:any={};
  public activitys:any=[];
  public mytrophy:any=[];

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private activityservice: ActivityService,
    private enrollservice: EnrollService,
    private dialog: MatDialog,
    private toaster: ToasterService,
    private auth:AuthService,
  ) {
    this.route.data.subscribe((data: any) => (this.title = data?.title));
    this.currentuser=this.currentuserservice.getdata;
  }

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: ([res]) => {
        this.userdata = res;
      },
      error: (err) => {
        this.toaster.show('error', err);
      },
    });
    this.currentuser = this.currentuserservice.getdata;
    this.currentuserservice
      .userDataEmitter()
      .subscribe((userdata: ICurrentuser) => {
        this.currentuser = userdata;
      });


    this.auth.me().subscribe({
      next: ([res]) => {
        this.userdata = res;
        this.enrollservice.activitybyuser(this.userdata.studentcode).subscribe({
          next: (res) => {
            this.items = res;
          },
          error: (err) => {
            console.log('load init activity of user err:', err);
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.toaster.show('error', err);
      },
    });

    this.loadData();
    
  }

  loadData(){
    //activity
    this.activityservice.filter({limit:4,publish:1}).subscribe({
      next:(res)=>{
        this.activitys=res.items;
      },
      error:(err)=>{
        console.log("home err:",err);
      }
    })
  
    this.enrollservice.myenroll().subscribe({
      next: (res:any[])=>{
        this.mytrophy=res.filter((item)=>{return item.activity_checkin===1});
      },
      error: (err)=>{
        console.log("myenroll() err:",err);
      }
    });
    
  }


  onQRcode(item: any) {
    this.enrollservice.useractivity(this.currentuser.studentcode,item.activity_id).subscribe({
      next:([res])=>{
        console.log("res:",res);
          this.dialog
          .open(DialogTokenShowComponent, {
            data: {
              title: "<a class='bi bi-geo-alt me-2'></a>Token Check-in",
              activity:item,
              enroll_token:res.enroll_token,
              userdata:this.currentuser
            },
          })
          .afterClosed()
          .subscribe({
            next: (res) => {
              if (res.affectedRows === 1) {
                //this.toaster.show('success', 'ลงทะเบียนเรียบร้อยแล้ว');
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด! ' + err);
            },
          });







      },
      error: (err) => {
        this.toaster.show('error', 'ผิดพลาด! ' + err);
      },
    })
  }

  onDetails(item:any){
    this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
  }

  onManage(item:any){
    this.router.navigate(['../activity/manage', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onCardSelect(item:any){
    if(item){
      this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
    }
  }

}

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
  public activitys: any;
 // public me: any;
  public currentuser:ICurrentuser;
  public userdata:any;

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
    console.log("currentuser:",this.currentuser);
  }

  ngOnInit(): void {
    console.log('student dashboard()');
    this.auth.me().subscribe({
      next: ([res]) => {
        console.log(res);
        this.userdata = res;
        this.enrollservice.activitybyuser(this.userdata.user_id).subscribe({
          next: (res) => {
            console.log('activity enroll by user :', res);
            this.activitys = res;
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


  }

  onQRcode(item: any) {
    console.log('on QR code item:', item);

    this.enrollservice.useractivity(this.currentuser.user_id,item.activity_id).subscribe({
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
              console.log("res:",res);
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

  onView(item:any){
    this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
  }


}

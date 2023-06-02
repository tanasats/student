import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
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
  public me: any;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private activityservice: ActivityService,
    private enrollservice: EnrollService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ) {
    this.route.data.subscribe((data: any) => (this.title = data?.title));
  }

  ngOnInit(): void {
    console.log('student dashboard()');
    //this.me = this.currentuserservice.getdata;
    this.me = JSON.parse(localStorage.getItem('userdata') || '');
    console.log('me data:', this.me);
    this.enrollservice.activitybyuser(this.me.user_id).subscribe({
      next: (res) => {
        console.log('activity enroll by user :', res);
        this.activitys = res;
      },
      error: (err) => {
        console.log('load init activity of user err:', err);
      },
    });
  }

  onQRcode(item: any) {
    console.log('on QR code item:', item);
    this.dialog
      .open(DialogTokenShowComponent, {
        data: {
          title: "<a class='bi bi-geo-alt me-2'></a>Token Check-in",
          activity:item,
          userdata:this.me
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
  }

  onView(item:any){
    this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
  }


}

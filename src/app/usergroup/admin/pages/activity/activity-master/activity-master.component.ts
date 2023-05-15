import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { AgencyService } from 'src/app/service/agency.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';

@Component({
  selector: 'app-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.scss'],
})
export class ActivityMasterComponent {
  public items: any; 


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityservice: ActivityService,
    private agencyservice:AgencyService,
    private activitytypeservice:ActivitytypeService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {
    this.load_Items();  
  }

  load_Items() {
    this.activityservice.getall().subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (err) => {
        console.log(err);
      },
    });    
  }




  onView(item: any) {
    console.log('onView():', item);
    // absolute path
    //this.router.navigate(["activity",item.activity_id], { state: { datas: item } })

    // relative path
    this.router.navigate(['../activity/view', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onEdit(item: any) {
    // console.log("onEdit():",item);
    // console.log("route:",this.route);
    // relative path
    this.router.navigate(['../activity/edit', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onDelete(item: any) { 
    console.log('onDelete()');
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          title: 'โปรดยืนยันการลบรายการ',
          description: 'ชื่อกิจกรรม: '+item.activity_name,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.activityservice.delete(item.activity_id).subscribe({
            next: (res) => {
              console.log(res);
              if (res.affectedRows === 1) {
                this.toaster.show('success', 'ลยรายการเรียบร้อยแล้ว');
				this.load_Items();
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด: ' + err);
            },
          });
        }
      });
  }
} // class

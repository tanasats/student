import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  public items:any[]=[];
  public items_draft:any[]=[];
  public items_approve:any[]=[];
  public items_work:any[]=[];

  public currentuser: any;
  public userdata:any;
  
  public score_activity:number=0;
  public score_student:number=0;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private auth:AuthService,
    private toaster:ToasterService,
    private activityservice:ActivityService,
    private dialog: MatDialog,
    ) {
    this.currentuser = this.currentuserservice.getdata;
    this.userdata=this.currentuser;
    this.loadData();
  }

  ngOnInit(): void {
    this.auth.me().subscribe({
      next: ([res]) => {
        console.log(res);
        this.userdata = res;
      },
      error: (err) => {
        console.log(err);
        this.toaster.show('error', err);
      },
    });
  }

  loadData(){
    this.activityservice.filter().subscribe({
      next:(res)=>{
        console.log("loadData() ",res);
        this.items=res.items;

        this.items_draft = this.items.filter((item:any)=>{ return item.activity_status==="d"});
        this.items_approve = this.items.filter((item:any)=>{ return item.activity_status==="a"});
        this.items_work = this.items.filter((item:any)=>{ return item.activity_status==="w"});
        
        this.score_activity=this.items.length;
        this.score_student=this.items.reduce((acc,cur)=>{ acc+=cur.activity_register; return acc},0)
      },
      error:(err)=>{

      }
    })
  }

  onQRScanner(item:any){
    console.log(item);
    this.router.navigate(['../activity/scanner', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onWork(item:any){
    console.log(item);
    this.router.navigate(['../activity/manage', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });    
  }

  onEdit(item: any) {
    this.router.navigate(['../activity/edit', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onDetail(item: any) {
    console.log('onDetail():', item);
    // absolute path
    //this.router.navigate(["activity",item.activity_id], { state: { datas: item } })
    // relative path
    this.router.navigate(['../activity/detail', item.activity_id], {
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
				this.loadData();
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด: ' + err);
            },
          });
        }
      });
  }

  
}

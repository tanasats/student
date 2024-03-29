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
  public items: any=[]; 
  public items_d:any=[];
  public items_a:any=[];
  public items_w:any=[];

  public totalItems: any;
  public totalPages: any;

  public currentPage:any=1;
  public pagelimit: number=99999;
  public keyword:string='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityservice: ActivityService,
    private agencyservice:AgencyService,
    private activitytypeservice:ActivitytypeService,
    private dialog: MatDialog,
    private toaster: ToasterService
  ) {
    
  }
  ngOnInit(): void {
    this._loadItem();  
  }
   compareActivityDate(a:any,b:any){
    return a.activity_date_from - b.activity_date_from;
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
        
        this.items_d.sort((a:any, b:any) => {  
          return (a.activity_date_from < b.activity_date_from?1:-1)
        })
        this.items_a.sort((a:any, b:any) => {  
          return (a.activity_date_from < b.activity_date_from?1:-1)
        })
        this.items_w.sort((a:any, b:any) => {  
          return (a.activity_date_from < b.activity_date_from?1:-1)
        })
        
        console.log(this.items_w)
 
        //this.items = res;
      },
      error: (err) => {
        this.toaster.show("error",err);
        console.log(err);
      },
    });    
  }

  onPageChange(page:any){
    this.currentPage=page;
    this._loadItem();
  }

  onView(item: any) {
    console.log('onView():', item);
    // absolute path
    //this.router.navigate(["activity",item.activity_id], { state: { datas: item } })
    // relative path
    this.router.navigate(['../activity/detail', item.activity_id], {
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
				this._loadItem();
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด: ' + err);
            },
          });
        }
      });
  }

  onGear(item: any) {
    console.log("current route:",this.route);
    console.log('onView():', item);
    this.router.navigate(['../activity/manage', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }

  onCreate(event:any){
    console.log("onCreate()")
    this.router.navigate(['create'], {
      relativeTo: this.route,
      state: { },
    });
  }

  onCancelApprove(event:any){

  }
  
  onCancelWork(event:any){
    
  }

  onTicket(item:any){
    console.log('onTicket():', item);
    this.router.navigate(['../activity/ticket', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });
  }


} // class

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

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

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private auth:AuthService,
    private toaster:ToasterService,
    private activityservice:ActivityService,
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

  onTitleClick(item:any){
    console.log(item);
    this.router.navigate(['../activity/manage', item.activity_id], {
      relativeTo: this.route,
      state: { datas: item },
    });    
  }


}

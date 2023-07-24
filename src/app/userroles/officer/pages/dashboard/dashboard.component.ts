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
  public items:any;
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
    this.loadDate();
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

  loadDate(){
    this.activityservice.getall().subscribe({
      next:(res)=>{
        console.log("loadData() ",res);
        this.items=res.items;
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




}

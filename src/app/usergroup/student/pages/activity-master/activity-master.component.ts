import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';

@Component({
  selector: 'app-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.scss'],
})
export class ActivityMasterComponent implements OnInit {
  public activitys:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private activityservice:ActivityService,
    private toaster:ToasterService,
  ) {

  }
  ngOnInit(): void {
    this.activityservice.getall().subscribe({
      next:(res)=>{
        if(res){
          this.activitys=res;
        }
      },
      error:(err)=>{
        this.toaster.show('error',err);
      }
    })
  }

onView(item:any){
  this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
}



}

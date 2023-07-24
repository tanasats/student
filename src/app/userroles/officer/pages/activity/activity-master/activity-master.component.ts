import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.scss']
})
export class ActivityMasterComponent {
  public items:any;
  public items_d:any;
  public items_a:any;
  public items_w:any;

  constructor(
    private activityservice:ActivityService,
    private router:Router,
    private route:ActivatedRoute
  ){
  this.loadDate();
  }

  loadDate(){
    this.activityservice.getall().subscribe({
      next:(res)=>{
        console.log("loadData() ",res);
        this.items=res.items;
        this.items_d = res.items.filter((item:any)=>{return item.activity_status=='d'});
        this.items_w = res.items.filter((item:any)=>{return item.activity_status=='a'});
        this.items_a = res.items.filter((item:any)=>{return item.activity_status=='w'});

        //console.log('items_w',this.items_w);
        //console.log('item_w',this.items_a);
      },
      error:(err)=>{

      }
    })
  }

  onCreate(event:any){
    console.log("onCreate()")
    this.router.navigate(['create'], {
      relativeTo: this.route,
      state: { },
    });
  }

onGear(item:any){
  console.log(item);
  console.log("current route:",this.route);
  console.log('onView():', item);
  // this.router.navigate(['../activity/manage', item.activity_id], {
    this.router.navigate(['/admin/activity/manage', item.activity_id], {
    relativeTo: this.route,
    state: { datas: item },
  });
}


}

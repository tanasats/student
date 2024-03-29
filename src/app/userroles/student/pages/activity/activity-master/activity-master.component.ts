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
  public items:any;
  public activity_ticket:any;
  public activity_regis:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private activityservice:ActivityService,
    private toaster:ToasterService,
  ) { }

  ngOnInit(): void {
    this._loadItems()
  }

  _loadItems() {
    console.log("_loadItems()")
    this.activityservice.filter({publish:1}).subscribe({
      next: (res) => {
        console.log("res:",res)
        this.items = res.items;
        this.activity_ticket = res.items.filter((item:any)=>{return item.activity_ticket});
        this.activity_regis = res.items.filter((item:any)=>{return !item.activity_ticket});

      },
      error: (err) => {
        console.log(err);
      },
    });       
  }



onView(item:any){
  this.router.navigate(["../activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
}



}

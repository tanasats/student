import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.scss']
})
export class ActivityManageComponent implements OnInit{
  public id: any;
  public state: any;
  public item: any;
constructor(
  private route:ActivatedRoute,
  private activityservice:ActivityService
){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
    console.log(this.item);
  }

}

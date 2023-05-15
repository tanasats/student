import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent {
  public id:any;
  public state: any;
  public item:any;

  constructor(
    private route:ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.state = history.state;
    this.item = history.state.datas;
  }
}

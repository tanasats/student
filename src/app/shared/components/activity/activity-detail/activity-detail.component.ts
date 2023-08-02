import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  public id:any;
  public state: any;
  public item:any;
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.state = history.state;
    this.item = history.state.datas;

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.item.activity_skill = JSON.parse(this.item.activity_skill);
  }


}

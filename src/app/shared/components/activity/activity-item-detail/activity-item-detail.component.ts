import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'activity-item-detail',
  templateUrl: './activity-item-detail.component.html',
  styleUrls: ['./activity-item-detail.component.scss']
})
export class ActivityItemDetailComponent implements OnInit{
  @Input() item:any;
  public fileuri=environment.fileuri;
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    ){}

  ngOnInit(): void {

  }



}

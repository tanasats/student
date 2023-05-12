import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public title?:string;
constructor(
  private route:ActivatedRoute,

){
  this.route.data.subscribe((data: any) => (this.title = data?.title));
}
}

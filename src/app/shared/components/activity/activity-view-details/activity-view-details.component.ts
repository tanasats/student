import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'activity-view-details',
  templateUrl: './activity-view-details.component.html',
  styleUrls: ['./activity-view-details.component.scss']
})
export class ActivityViewDetailsComponent {
  constructor(
    private router:Router,
  ){}
@Input() items:any;





onView(item:any){
  this.router.navigate(["/activity",item.activity_id], { state: { datas: item } })
}

}//class

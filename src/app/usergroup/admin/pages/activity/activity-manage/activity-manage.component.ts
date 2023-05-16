import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollService } from 'src/app/service/enroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.scss'],
})
export class ActivityManageComponent implements OnInit {
  public id: any;
  public state: any;
  public item: any;
  public registrant: any;

  constructor(
    private route:ActivatedRoute,
    private enrollservice:EnrollService,
  ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
    this.load_registrant();
  }

  load_registrant(){
    this.enrollservice.registrant(this.item.activity_id).subscribe({
      next:(res)=>{
        this.registrant=res;
      },
      error:(err)=>{
        console.log("enroll.registrant err:",err);
      }
    });
  }

  //this.form.patchValue(this.item);
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { StudentService } from 'src/app/service/student.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.scss']
})
export class ActivityManageComponent {
  public id: any;
  public state: any;
  public item: any;
  public registrant: any=[];

  constructor(
    private route:ActivatedRoute,
    private enrollservice:EnrollService,
    private activityService:ActivityService,
    private toaster:ToasterService,
    private studentService:StudentService
  ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
    this.load_registrant();
    
    this.studentService.getall({}).subscribe({
      next: (res) => {
          console.log(res);
      },
      error: (err) =>{
          console.log(err);
      }
    })
  }
 
  load_registrant(){
    const datas = {
      activity_id:this.item.activity_id,
      keyword:'',
      page:1,
      //pagesize:1 //if this line comment the result use pagesize=10 by default
    }
    this.enrollservice.registrant(datas).subscribe({
      next:(res)=>{
        this.registrant=res.map((item:any)=>{
          const found = APPCONST.ENROLL_POSITION.find(obj=>{return obj.id==item.enroll_position})
          if(found) { item.enroll_position_name=found.name}
          else { item.enroll_position_name="*"}
          return item;
        });
        console.log(this.registrant);
        
      },
      error:(err)=>{
        console.log("enroll.registrant err:",err);
      }
    });
  }

  onPublish(){
    this.item.activity_publish=!this.item.activity_publish;
    let datas = {
      'activity_id':this.item.activity_id,
      'activity_publish':this.item.activity_publish
    }
    this.activityService.update(datas).subscribe({
      next: (res)=>{
        console.log("res:",res);
        if(res.affectedRows){
          if(this.item.activity_publish){
            this.toaster.show("success","เผยแพร่กิจกรรม")
          }else{
            this.toaster.show("error","หยุดเผยแพร่กิจกรรม")
          }          
        }
      },
      error: (err)=>{
        console.log("err",err);
      }
    })
  }

 

}

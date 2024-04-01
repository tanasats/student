import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { ActivityService } from 'src/app/service/activity.service';
import { TodayService } from 'src/app/service/today.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit{
  public id:any;
  public item:any;
  public fileuri=environment.fileuri;
  public poster:any="assets/images/image_not_available.png";

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private activity:ActivityService,
    private todayservice:TodayService,
    private http:HttpClient,
  ){}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p =>{
      console.log(p);
      this.activity.getbyid(p['id']).subscribe({
        next:([res])=>{
          console.log(res);
          this.item=res;
          this.item.activity_faculty = JSON.parse(res.activity_faculty);
          
          this.poster = this.fileuri+"picture/"+this.item.activity_picture;

          // this.http.get("http://localhost:3000/api/picture/1710937610381.jpg",{ responseType: 'blob' }).subscribe({
          //   next: (data)=>{
          //     console.log("img response:",data);
          //     this.poster=data;
          //   }
          // })
        }
      })
    });
     //this.activatedRoute.params.pipe(map((p) => console.log(p)));
  }
  
  onSubmit(){
    this.router.navigate(["login"], {});
  }

  onCancel(){
    this.router.navigate([""], {});
  }

  get isBetween():any{
    return this.todayservice.isBetween(this.item.activity_register_from,this.item.activity_register_to);
  }  

}

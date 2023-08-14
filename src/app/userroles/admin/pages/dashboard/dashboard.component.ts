import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public title?: string;
  public items:any[]=[];
  public items_draft:any[]=[];
  public items_approve:any[]=[];
  public items_work:any[]=[];
  public items_publish:any[]=[];
  
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {
    this.activeroute.data.subscribe((data: any) => {
      this.title = data.title;
    });
  }
  ngOnInit(): void {
    this.activityService.filter().subscribe({
      next: (res) => {
        console.log(res);
        this.items=res.items;
        console.log(typeof(this.items))
        console.log("items:",this.items);

        this.items_draft = this.items.filter((item:any)=>{ return item.activity_status==="d"});
        this.items_approve = this.items.filter((item:any)=>{ return item.activity_status==="a"});
        this.items_work = this.items.filter((item:any)=>{ return item.activity_status==="w"});
        this.items_publish = this.items.filter((item:any)=>{ return item.activity_publish===1});

        
        // const groupbystatus = this.items.reduce((acc,cur)=>{
        //   //--> ผลบวกครั้งแรกจะเป็น Nan เพราะ acc.d ยังไม่ได้กำหนดค่า ผมเลยกำหนดให้ ถ้าเป็น Nan ก็เอามา || กับค่าเริ่มตนที่ต้องการ
        //   acc.d = acc.d+(cur.activity_status==="d"?1:0) ||(cur.activity_status==="d"?1:0); 
        //   acc.a = acc.a+(cur.activity_status==="a"?1:0) ||(cur.activity_status==="a"?1:0);
        //   acc.w = acc.w+(cur.activity_status==="w"?1:0) ||(cur.activity_status==="w"?1:0);
        // return acc
        // },{})
        // console.log("groupbystatus=",groupbystatus);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

onTitleClick(item:any){
  //this.router.navigate(['../activity/manage', item.activity_id], {
  this.router.navigate(['../activity'], {  
    relativeTo: this.activeroute,
    //state: { datas: item },
  });
}

loadData(){
  // this.activityService.getall().subscribe({
  //   next: (res)=>{
  //     console.log(res);
  //   },
  //   error: (err)=>{
  //     console.log(err);
  //   }
  // })
}



}

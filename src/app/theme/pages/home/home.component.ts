import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActivity } from 'src/app/core/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
//import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public activitys:IActivity[] = [];
  //public fileuri = environment.fileuri;
  public userdata:any;
  constructor(
    private toster:ToasterService,
    private router:Router,
    private activityservice:ActivityService,
    private currentuser:CurrentUserService,

  ){}

  ngOnInit(): void {
    this.userdata = this.currentuser.getdata;
    console.log("userdata : ",this.userdata);
    if(this.userdata.role.role_name){
      this.router.navigate(['/'+this.userdata.role.role_name]);
    }
    this._load_init_data();    
  }

	_load_init_data(){
		// this.activityservice.getall()
		// .subscribe({
		// 	next:(res) =>{
		// 		console.log("home:",res);
    //     this.activitys=res.items;
		// 	},
		// 	error:(err) =>{
		// 		throw new Error('Method not implemented.',err);
		// 	}
		// })
	
  this.activityservice.filter({limit:4,publish:1}).subscribe({
    next:(res)=>{
      console.log("home res:",res);
      this.activitys=res.items;
    },
    error:(err)=>{
      console.log("home err:",err);
    }
  })
  
  }

  onActivitySelect(item:any){
    this.router.navigate(["/activity",item.activity_id], { state: { datas: item } });
  }

} //class

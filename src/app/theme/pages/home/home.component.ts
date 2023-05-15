import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActivity } from 'src/app/core/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public activitys:IActivity[] = [];
  

  constructor(
    private toster:ToasterService,
    private router:Router,
    private activityservice:ActivityService,
  ){}

  ngOnInit(): void {
    this._load_init_data();
  }


	_load_init_data(){
		this.activityservice.getall()
		.subscribe({
			next:(res) =>{
				console.log(res);
        this.activitys=res;
			},
			error:(err) =>{
				throw new Error('Method not implemented.',err);
			}
		})
	}

  onActivitySelect(item:any){
    this.router.navigate(["/activity",item.activity_id], { state: { datas: item } });
  }

} //class

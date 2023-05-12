import { Component } from '@angular/core';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.scss']
})
export class ActivityMasterComponent {
  public items:any;

	constructor(
	private activityservice:ActivityService,
    ) {}
	ngOnInit(): void {
		this.load_init_data();
	}

	load_init_data(){
		this.activityservice.getall()
		.subscribe({
			next:(res) =>{
				this.items=res;
			},
			error:(err) =>{
				console.log(err);
			}
		})
	}



}

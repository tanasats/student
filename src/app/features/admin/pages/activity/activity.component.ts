import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity.service';
import { DialogService } from 'src/app/service/dialog.service';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit{
 	public items:any;

	constructor(
	private dialog:DialogService,
	private activityservice:ActivityService,
    ) {}
	ngOnInit(): void {
		this._load_init_data();
	}

	_load_init_data(){
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



	
	modal_response(datas:any){
		console.log("Dialog datas:"+JSON.stringify(datas));
	}
  
	test(event:any){
		// var button = document.createElement('button');  
		// button.innerText = "Add"; 
		// button.setAttribute("data-bs-toggle","modal");
		// button.setAttribute("data-bs-target","#exampleModal");
		// button.setAttribute("hidden","hidden")
		// document.body.appendChild(button);
		// button.click();
		// button.remove();
		this.dialog.toggle("exampleModal");
	}
}

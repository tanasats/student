import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public activity_datas:any[] = [
    {
      id: 11,
      title: 'Test Person1',
      description: 'Section 1',
      picture: 'https://picsum.photos/id/56/1200/630',
      receive:100,
      register:11,
    },
    {
      id: 175,
      title: 'Test Person3',
      description: 'Section 3',
      picture: 'https://picsum.photos/id/175/1200/630'
    },
    {
      id: 32,
      title: 'Test Person3',
      description: 'Section 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex minima nulla nesciunt? Illo reprehenderitLorem ipsum dolor sit amet, consectetur adipisicing elit. Ex minima nulla nesciunt? Illo reprehenderit',
      picture: 'https://picsum.photos/id/21/1200/630'
    },
    {
      id: 56,
      title: 'Test Person3',
      description: 'Section 3',
      picture: 'https://picsum.photos/id/34/1200/630'
    },
    {
      id: 77,
      title: 'Test Person3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex minima nulla nesciunt? Illo reprehenderit vero quae dolor, esse, iure doloremque deserunt voluptate, tempora eveniet blanditiis ullam dolores dignissimos debitis ipsa. Velit delectus quae, aspernatur harum dolor hic voluptatum? Odit quo totam, voluptatibus blanditiis nam dolorem obcaecati exercitationem vel quia ad cumque sed, architecto saepe nobis magnam accusantium alias aperiam vero?',
      picture: 'https://picsum.photos/id/75/1200/630'
    },
  ];
  

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
        this.activity_datas=res;
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

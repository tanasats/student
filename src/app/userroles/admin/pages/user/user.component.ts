import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public items:any[]=[];
  constructor(
    private userservice:UserService,
  ){
    this.loadData()
  }

  loadData(){
      this.userservice.getall().subscribe({
      next: (res) =>{
        console.log("res:",res);
        this.items=res;
      },
      error: (err) =>{
        console.log("err:",err);
      }
    })  
  }


}

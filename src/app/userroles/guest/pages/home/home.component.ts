import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { GuestService } from 'src/app/service/guest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public items:any;
constructor(
  private guestService:GuestService,
  private currentuser:CurrentUserService,
  private router:Router,
  private route:ActivatedRoute
) {} 

ngOnInit(): void {

  const currentuser = this.currentuser.getdata;
  if (currentuser.is_login) {
  //   // this.router.navigateByUrl('/login')
  //   // console.log("redirect to login page")
  // }else {
    // this.router.navigateByUrl(currentuser.role.role_name+"/activity/details/"+event.activity_id);
    // this.router.navigate(["../"+currentuser.role.role_name+"/activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
    this.router.navigate(["../"+currentuser.role.role_name+"/dashboard"], {relativeTo: this.route});
    console.log("goto register activity")
  }

  this.guestService.activity().subscribe({
    next: (res) =>{
      console.log(res);
      this.items=res;
    },
    error: (err) =>{
      console.log(err);
    }
  })

}

onJoin(event:any):void{
  const item=event;
  console.log("on join to activity");
  console.log(event)
  const currentuser = this.currentuser.getdata;
  if (!currentuser.is_login) {
    this.router.navigateByUrl('/login')
    console.log("redirect to login page")

  }else {
    // this.router.navigateByUrl(currentuser.role.role_name+"/activity/details/"+event.activity_id);
    // this.router.navigate(["../"+currentuser.role.role_name+"/activity/details",item.activity_id], {relativeTo: this.route, state: { datas: item } });
    this.router.navigate(["../"+currentuser.role.role_name+"/dashboard"], {relativeTo: this.route});

    console.log("goto register activity")
  }

}

}

import { Component, OnInit } from '@angular/core';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public currentuser: any;
  public userdata: any;
  public sw1: boolean = true;

  constructor(
    private auth: AuthService,
    private userservice: UserService,
    private currentuserService: CurrentUserService,
    private toaster:ToasterService,
  ) {}
  ngOnInit(): void {
    this.auth.me().subscribe({
      next: ([res]) => {
        console.log(res);
        this.userdata = res;
      },
      error: (err) => {
        console.log(err);
        this.toaster.show('error', err);
      },
    });
    this.currentuser = this.currentuserService.getdata;
    this.currentuserService
      .userDataEmitter()
      .subscribe((userdata: ICurrentuser) => {
        console.log('user-profile receive currentuser data');
        this.currentuser = userdata;
      });
  } //ngOnInit()

  changerole(role_id: number) {
    this.sw1 = !this.sw1;
    this.currentuserService.changerole(role_id);
  }
}

import { AfterContentInit, Component } from '@angular/core';
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
export class UserProfileComponent  {
  public currentuser: ICurrentuser|null=null;
  public userdata: any = null;

  public userroles: any = [];
  public userrole: any;

  public sw1: boolean = true;

  constructor(
    private auth: AuthService,
    private currentuserService: CurrentUserService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    console.log('ngOnInit()');
    this.currentuser = this.currentuserService.getdata;
    //this.currentuser = JSON.parse(localStorage.getItem("userdata")||'');
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
    this.currentuserService
      .userDataEmitter()
      .subscribe((_currentuser: ICurrentuser) => {
        console.log('navbar receive currentuser:', _currentuser);
        this.currentuser = _currentuser;
      });
  } //ngOnInit()

  _changerole(role_id: number) {
    this.sw1 = !this.sw1;
    this.currentuserService.changerole(role_id);
    this.userrole = this.currentuserService.currentrole;
  }
}

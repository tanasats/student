import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject, min } from 'rxjs';
import { AuthService } from './auth.service';
import { ToasterService } from './toaster/toaster.service';
import { UserService } from './user.service';
import { ICurrentuser } from '../core/interface/currentuser';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService{
  private _currentuser: ICurrentuser;
 // @Output() _userdata: EventEmitter<any> = new EventEmitter<any>();
  @Output() _userdata = new EventEmitter<any>();
  public userDataEmitter() {
    return this._userdata;
  }

  // private _is_login: boolean = false;
  // public username: any;
  // public fullname: any;
  // public usertype: any;
  // public roles: any = [];
  // public role: any = {};

  private is_loginResponseSource = new Subject<any>();
  public is_loginResponse$ = this.is_loginResponseSource.asObservable();

  public get currentrole(){
    // return this.role;
    return this._currentuser.role;
  }

  constructor(
    private auth: AuthService,
    private toaster: ToasterService,
    ){
     this._currentuser = this.InitCurrentuser;

    if (localStorage.getItem('access-token') !== null) {
      this.auth.tokenizer().subscribe({ //verivy access-token localstorage
        next: (res) => {
          console.log('currentuser.tokenizer() res:', res);
          if (res.access_token) {
            this.auth.me().subscribe({
              next:([res])=>{
                if(res.username){

                  this.login({
                    user_id: res.user_id,
                    username: res.username,
                    studentcode: res.studentcode,
                    staffid: res.staffid,
                    fullname: res.fullname,
                    faculty_id: res.faculty_id,
                    faculty_name: res.faculty_name,
                    email: res.email,
                    usertype: res.usertype,
                    roles: res.roles,
                  });
                  
                }
              }
            })
          }
        },
        error: (err) => {
          console.log('currentuser.tokenizer() err:', err);
          this.logout();
          this.toaster.show('error', err);
        },
      });
    }
  }

  private get InitCurrentuser(): ICurrentuser{
    return {
      is_login: false,
      user_id:0,
      username:'',
      studentcode:'',
      fullname:'',
      faculty_id:0,
      faculty_name:'',
      email:'',
      role:{role_id:0,role_name:''},
      roles:[],
    }
  }

  // xlogin(userdata: any) {
  //   console.log('currentuser login by userdata:', userdata);
  //   const roles = JSON.parse(userdata.roles);
  //   const minimum_role = roles.reduce((prev: any, curr: any) =>
  //     prev.role_id < curr.role_id ? prev : curr
  //   );
  //   const ls_userdata = {
  //     username: userdata.username,
  //     fullname: userdata.fullname,
  //     usertype: userdata.usertype,
  //     roles: roles,
  //     role: minimum_role,
  //   };
  //   localStorage.setItem('userdata', JSON.stringify(ls_userdata));

  //   this.username = userdata.username;
  //   this.fullname = userdata.fullname;
  //   this.usertype = userdata.usertype;
  //   this.roles = roles;
  //   this.role = minimum_role;

  //   this._is_login = true;
  //   this.is_loginResponseSource.next(this._is_login);
  // }

  login(data:any){
    const roles = JSON.parse(data.roles);
    const minimum_role = roles.reduce((prev: any, curr: any) =>
      prev.role_id > curr.role_id ? prev : curr
    );
    this._currentuser ={
      "is_login":false,
      "user_id":data.user_id,
      "username":data.username,
      "studentcode": data.studentcode,
      "fullname":data.fullname,
      "faculty_id":data.faculty_id,
      "faculty_name":data.faculty_name,
      "email":data.email,
      "role":minimum_role,
      "roles":roles,
    }
    
    // this._is_login = true;
    // this.is_loginResponseSource.next(this._is_login); 

    localStorage.setItem('userdata', JSON.stringify(this._currentuser));
    this._currentuser.is_login=true;
    this._userdata.emit(this._currentuser);
  }

  changerole(role_id:number){
    const item_found = this._currentuser.roles.find((item:any)=>{return item.role_id===role_id;});
    if(item_found){
      console.log("change role:",item_found); 
      this._currentuser.role=item_found;
    }
    localStorage.setItem('userdata', JSON.stringify(this._currentuser));
    this._userdata.emit(this._currentuser);
  }

  logout(){
    this._currentuser = this.InitCurrentuser;
    localStorage.removeItem('access-token');
    localStorage.removeItem('userdata');
    this._userdata.emit(this._currentuser);
  }

  public get getdata(){
    return this._currentuser;
  }

}

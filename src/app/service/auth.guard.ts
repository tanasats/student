import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private currentusersercice:CurrentUserService,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      console.log('authGuard #canActivate called')
    //return false;
    return this.checkAllowRole(route.data['activateroles']);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  private checkAllowRole(ExpectedRole:any[]):boolean{
    const userdata = this.currentusersercice.getdata;
    console.log("guard check currentuserrole: ",userdata.role.role_name);
    console.log("Expected Role:",ExpectedRole);
    if(ExpectedRole==undefined){
      return false;
    }
    //const currentUserRole = this.currUserService.roles; //<-- check from all role of user has
    

    //<-- check from current role of user
    // console.log("checkAllowRole() current user rules is ",currentUserRole);
    // let result = ExpectedRole.some(r=> currentUserRole.includes(r))
    // console.log('checkAllowRole()=',result);
    let result = ExpectedRole.some(r=>userdata.role.role_name==r);
    console.log("check allow role:",result)
    return result;
  }
  
}

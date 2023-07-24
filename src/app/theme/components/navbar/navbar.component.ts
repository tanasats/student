import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { IMenuItem } from 'src/app/core/interface/menuitem';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { environment } from 'src/environments/environment';
import { admin_menu_items, student_menu_items,officer_menu_items } from './menu.item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public currentuser: ICurrentuser | null = null;
  public showNavbar = false;
  public menuItems: IMenuItem[] = [];
  logo = environment.appShortName_en;

  constructor(
    private currentuserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentuserService
      .userDataEmitter()
      .subscribe((_currentuser: ICurrentuser) => {
        console.log('navbar receive currentuser:', _currentuser);
        this.currentuser = _currentuser;
        switch (this.currentuser.role.role_name) {
          case 'admin':
            this.menuItems = admin_menu_items;
            break;
          case 'student':
            this.menuItems = student_menu_items;
            break;
          case 'officer':
              this.menuItems =officer_menu_items;
              break;
          case 'developer':
              this.menuItems=[];
              break;
          default:
            this.menuItems = [];
        }
      });
  }

  logout() {
    this.currentuserService.logout();
    this.router.navigate(['/']);
  }

  navbarToogle() {
    this.showNavbar = !this.showNavbar;
  }

  toggle() {
    const btnNavbarToggle = document.querySelector(
      '#btnNavbarToggle'
    ) as HTMLElement;
    const navbarStudentActivity = document.querySelector(
      '#navbarStudentActivity'
    ) as HTMLElement;
    btnNavbarToggle.classList.add('collapsed');
    btnNavbarToggle.setAttribute('aria-expanded', 'false');
    navbarStudentActivity.classList.remove('show');
    navbarStudentActivity.classList.add('collapsed');
  }
}

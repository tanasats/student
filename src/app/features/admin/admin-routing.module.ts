import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './admin.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { breadcrumb: 'Dashboard' },
    children: [
      // { 
      //   path: '', 
      //   redirectTo: 'home', 
      //   pathMatch:'full',
      //   data: { breadcrumb:"test"},
      // },
      // { 
      //   path:'home', 
      //   component: HomeComponent, data: { breadcrumb: 'Home' },
      // },
      
      { 
        path:'', 
        component: HomeComponent, data: { breadcrumb: '' },
      },
      { 
        path:'activity', 
        component: ActivityComponent, data: { breadcrumb: 'Activity' },
      },
      { 
        path:'activity-create', 
        component:ActivityCreateComponent, data: { breadcrumb: 'New Activity' }
      },
      {
        path:'profile',
        component: UserProfileComponent, data: { breadcrumb: 'Profile' },
      },
      { 
        path:'**',
        redirectTo:'/page-not-found'
      }
    ],
  },
  {path:'**',redirectTo:'/page-not-found'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

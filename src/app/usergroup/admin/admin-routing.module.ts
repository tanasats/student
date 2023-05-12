import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from '../admin/template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';

const routes: Routes = [
  { path:'',component:DefaultPageComponent,
    children:[
      {path:'dashboard', component:DashboardComponent,data:{'title':'ผู้ดูแลระบบ'}},
      {path:'activity',component:ActivityMasterComponent},
      {path:'activity-create',component:ActivityCreateComponent},
      {path:'user-profile',component:UserProfileComponent},

  

      {path:'',redirectTo:'dashboard',pathMatch:'full'}      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

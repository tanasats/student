import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from '../admin/template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { ActivityDetailComponent } from './pages/activity/activity-detail/activity-detail.component';
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';

const routes: Routes = [
  { path:'',component:DefaultPageComponent,
    children:[
      {path:'dashboard', component:DashboardComponent,data:{'title':'ผู้ดูแลระบบ'}},
      {path:'activity',component:ActivityMasterComponent,data:{breadcrumb:'กิจกรรม'}},
      {path:'activity/create',component:ActivityCreateComponent,data:{breadcrumb:'สร้างกิจกรรม'}},
      {path:'activity/detail/:id',component:ActivityDetailComponent,data:{breadcrumb:'รายละเอียด'}},    
      {path:'activity/edit/:id',component:ActivityEditComponent,data:{breadcrumb:'แก้ไข'}},      
      {path:'activity/manage/:id',component:ActivityManageComponent,data:{breadcrumb:'จัดการกิจกรรม'}},
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckCreditComponent } from './pages/check-credit/check-credit.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { ActivityDetailsComponent } from './pages/activity/activity-details/activity-details.component'; 
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { ActivityViewComponent } from './pages/activity/activity-view/activity-view.component';

const routes: Routes = [
  {path:'',component:DefaultPageComponent,
children:[
  {path:'dashboard', component:DashboardComponent,data:{'title':'นิสิต', breadcrumb: 'หน้าหลัก' }},


  {path:'activity',component:ActivityComponent,data:{breadcrumb:'รายการกิจกรรม'},
  children:[
     {path:'', component:ActivityMasterComponent,data:{'title':'นิสิต', breadcrumb: '' }},
     {path:'details/:id', component:ActivityDetailsComponent,data:{'title':'นิสิต', breadcrumb: 'รายละเอียดกิจกรรม' }},
     {path:'manage/:id', component:ActivityManageComponent,data:{'title':'นิสิต', breadcrumb: 'กิจกรรมของฉัน' }},
     {path:'view/:id', component:ActivityViewComponent,data:{'title':'นิสิต', breadcrumb:'ผลการร่วมกิจกรรม'}}
  ]}, 

 
  
  
  {path:'checkcredit', component:CheckCreditComponent,data:{'title':'นิสิต', breadcrumb: 'ตรวจสอบจบ' }},
 
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
]}
]; //Routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

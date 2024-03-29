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
  {path:'',component:DefaultPageComponent,data:{breadcrumb:'หน้าหลัก'},
children:[
  {path:'dashboard', component:DashboardComponent,data:{ breadcrumb: '' }},
  {path:'activity',component:ActivityComponent,data:{breadcrumb:'รายการกิจกรรม'},
    children:[
       {path:'', component:ActivityMasterComponent,data:{ breadcrumb: '' }},
       {path:'details/:id', component:ActivityDetailsComponent,data:{ breadcrumb: 'รายละเอียดกิจกรรม' }},
       {path:'manage/:id', component:ActivityManageComponent,data:{ breadcrumb: 'กิจกรรมของฉัน' }},
       {path:'view/:id', component:ActivityViewComponent,data:{ breadcrumb:'ผลการร่วมกิจกรรม'}}
    ]}, 
    {path:'checkcredit', component:CheckCreditComponent,data:{ breadcrumb: 'ตรวจสอบจบ' }},
    {path:'',redirectTo:'dashboard',pathMatch:'full'}
]}
]; //Routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

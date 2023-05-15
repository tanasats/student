import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityMasterComponent } from './pages/activity-master/activity-master.component';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component'; 
import { CheckCreditComponent } from './pages/check-credit/check-credit.component';

const routes: Routes = [
  {path:'',component:DefaultPageComponent,
children:[
  {path:'dashboard', component:DashboardComponent,data:{'title':'นิสิต', breadcrumb: 'แผงควบคุม' }},
  {path:'activity', component:ActivityMasterComponent,data:{'title':'นิสิต', breadcrumb: 'กิจกรรม' }},
  {path:'activity/details/:id', component:ActivityDetailsComponent,data:{'title':'นิสิต', breadcrumb: 'รายละเอียดกิจกรรม' }},
  {path:'checkcredit', component:CheckCreditComponent,data:{'title':'นิสิต', breadcrumb: 'ตรวจสอบจบ' }},

  {path:'',redirectTo:'dashboard',pathMatch:'full'}
]}
]; //Routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

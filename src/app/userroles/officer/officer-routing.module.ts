import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/theme/pages/user-profile/user-profile.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityManagerComponent } from './pages/activity/activity-manager/activity-manager.component';
import { ActivityScannerComponent } from './pages/activity/activity-scanner/activity-scanner.component';

const routes: Routes = [
  { path:'',component:DefaultPageComponent,
    children:[
      {path:'dashboard', component:DashboardComponent,data:{breadcrumb:'เจ้าหน้าที่'}},
      {path:'activity',component:ActivityMasterComponent,data:{breadcrumb:'กิจกรรม'}},
      {path:'activity/create',component:ActivityCreateComponent,data:{breadcrumb:'สร้างกิจกรรม'}},
      // {path:'activity/detail/:id',component:ActivityDetailComponent,data:{breadcrumb:'รายละเอียด'}},    
      // {path:'activity/edit/:id',component:ActivityEditComponent,data:{breadcrumb:'แก้ไข'}},      
      {path:'activity/manage/:id',component:ActivityManagerComponent,data:{breadcrumb:'จัดการกิจกรรม'}},
      {path:'activity/scanner/:id',component:ActivityScannerComponent},
      // {path:'agency',component:AgencyMasterComponent,data:{breadcrumb:'หน่วยงานผู้จัดกิจกรรม'}},
      // {path:'activitytype',component:ActivitytypeMasterComponent,data:{breadcrumb:'ประเภทกิจกรรม'}},
      // {path:'faculty',component:FacultyMasterComponent,data:{breadcrumb:'คณะหน่วยงาน'}},
      // {path:'checkin',component:CheckinComponent,data:{breadcrumb:'ลงชื่อเข้าร่วมกิจกรรม'}},
      // {path:'user',component:UserComponent,data:{bradcrumb:'จัดการผู้ใช้งาน'}},

      {path:'user-profile',component:UserProfileComponent},

  

      {path:'',redirectTo:'dashboard',pathMatch:'full'}      
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerRoutingModule { }

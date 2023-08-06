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
import { UserComponent } from './pages/user/user.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { AgencyMasterComponent } from './pages/agency/agency-master/agency-master.component';
import { ActivitytypeMasterComponent } from './pages/activitytype/activitytype-master/activitytype-master.component';
import { FacultyMasterComponent } from './pages/faculty/faculty-master/faculty-master.component';
import { TranscriptPreviewComponent } from './pages/transcript/transcript-preview/transcript-preview.component';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { ActivityTicketComponent } from './pages/activity/activity-ticket/activity-ticket.component';

const routes: Routes = [
  { path:'',component:DefaultPageComponent,data:{breadcrumb:'หน้าควบคุม'},
    children:[
      { path:'dashboard', component:DashboardComponent,data:{breadcrumb:''}},
    ]
  },
  { path:'activity',component:ActivityComponent,data:{breadcrumb:'กิจกรรม'},
       children:[
          { path:'',component:ActivityMasterComponent,data:{breadcrumb:''}},
          { path:'create',component:ActivityCreateComponent,data:{breadcrumb:'เพิ่มกิจกรรม'}},
          { path:'manage/:id',component:ActivityManageComponent,data:{breadcrumb:'จัดการกิจกรรม'}},
          { path:'detail/:id',component:ActivityDetailComponent,data:{breadcrumb:'รายละเอียดกิจกรรม'}},
          { path:'edit/:id',component:ActivityEditComponent,data:{breadcrumb:'แก้ไขกิจกรรม'}},       
          { path:'ticket/:id',component:ActivityTicketComponent,data:{breadcrumb:'จัดการบัตรกิจกรรม'}},       
       ]
  },

      {path:'agency',component:AgencyMasterComponent,data:{breadcrumb:'หน่วยงานผู้จัดกิจกรรม'}},
      {path:'activitytype',component:ActivitytypeMasterComponent,data:{breadcrumb:'ประเภทกิจกรรม'}},
      {path:'faculty',component:FacultyMasterComponent,data:{breadcrumb:'คณะหน่วยงาน'}},
      {path:'checkin',component:CheckinComponent,data:{breadcrumb:'ลงชื่อเข้าร่วมกิจกรรม'}},
      {path:'transcript/preview',component:TranscriptPreviewComponent},
      {path:'user',component:UserComponent,data:{bradcrumb:'จัดการผู้ใช้งาน'}},
      {path:'user-profile',component:UserProfileComponent},

      {path:'',redirectTo:'dashboard',pathMatch:'full'}      
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

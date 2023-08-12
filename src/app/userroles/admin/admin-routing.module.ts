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
import { AuthGuard } from 'src/app/service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultPageComponent,
    data: { breadcrumb: 'หน้าหลัก' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: '' },
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], breadcrumb: 'รายการกิจกรรม' },
        children: [
          {
            path: '',
            component: ActivityMasterComponent,
            data: { breadcrumb: '' },
          },
          {
            path: 'create',
            component: ActivityCreateComponent,
            canActivate: [AuthGuard],
            data: { activateroles: ['admin'], breadcrumb: 'เพิ่มกิจกรรม' },
          },
          {
            path: 'manage/:id',
            component: ActivityManageComponent,
            canActivate: [AuthGuard],
            data: { activateroles: ['admin'], breadcrumb: 'ดำเนินการกิจกรรม' },
          },
          {
            path: 'detail/:id',
            component: ActivityDetailComponent,
            canActivate: [AuthGuard],
            data: { activateroles: ['admin'], breadcrumb: 'รายละเอียดกิจกรรม' },
          },
          {
            path: 'edit/:id',
            component: ActivityEditComponent,
            canActivate: [AuthGuard],
            data: { activateroles: ['admin'], breadcrumb: 'แก้ไขกิจกรรม' },
          },
          {
            path: 'ticket/:id',
            component: ActivityTicketComponent,
            canActivate: [AuthGuard],
            data: { activateroles: ['admin'], breadcrumb: 'จัดการบัตรกิจกรรม' },
          },
        ],
      },
      {
        path: 'agency',
        component: AgencyMasterComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], breadcrumb: 'หน่วยงานผู้จัดกิจกรรม' },
      },
      {
        path: 'activitytype',
        component: ActivitytypeMasterComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], breadcrumb: 'ประเภทกิจกรรม' },
      },
      {
        path: 'faculty',
        component: FacultyMasterComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], breadcrumb: 'คณะหน่วยงาน' },
      },
      {
        path: 'checkin',
        component: CheckinComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], breadcrumb: 'ลงชื่อเข้าร่วมกิจกรรม' },
      },
      {
        path: 'transcript/preview',
        component: TranscriptPreviewComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'] },
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { activateroles: ['admin'], bradcrumb: 'จัดการผู้ใช้งาน' },
      },
      { path: 'user-profile', component: UserProfileComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
]; //Routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

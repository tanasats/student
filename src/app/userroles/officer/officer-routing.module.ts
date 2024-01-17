import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/theme/pages/user-profile/user-profile.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityScannerComponent } from './pages/activity/activity-scanner/activity-scanner.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';
import { ActivityDetailComponent } from './pages/activity/activity-detail/activity-detail.component';
import { CheckinComponent } from './pages/checkin/checkin.component';

const routes: Routes = [
  { path: '',component: DefaultPageComponent,data:{breadcrumb:'หน้าหลัก'},
      children: [
      { path: 'dashboard',component: DashboardComponent,data: { breadcrumb: '' },},
      { path: 'activity',component: ActivityComponent,data: {breadcrumb: 'กิจกรรม'},
        children: [
        { path: '',component: ActivityMasterComponent,data: { breadcrumb: '' }},
        { path: 'create',component: ActivityCreateComponent,data: { breadcrumb: 'สร้างกิจกรรม' }},
        { path: 'edit/:id',component: ActivityEditComponent,data: { breadcrumb: 'แก้ไขกิจกรรม' }},
        { path: 'detail/:id',component: ActivityDetailComponent,data: { breadcrumb: 'รายละเอียดกิจกรรม' }},
        { path: 'manage/:id',component: ActivityManageComponent,data: { breadcrumb: 'จัดการกิจกรรม' }},
        { path: 'scanner/:id',component: ActivityScannerComponent,data: { breadcrumb: 'บันทึกเข้าร่วมกิจกรรมด้วย' }},
            ]
        },

      { path: 'checkin',component: CheckinComponent,data: { activateroles: ['admin'], breadcrumb: 'บันทึกเข้าร่วมกิจกรรม' }},
      { path: 'user-profile', component: UserProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficerRoutingModule {}

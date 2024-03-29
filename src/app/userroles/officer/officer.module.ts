import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerRoutingModule } from './officer-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { ActivityScannerComponent } from './pages/activity/activity-scanner/activity-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';
import { ActivityDetailComponent } from './pages/activity/activity-detail/activity-detail.component';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { ImportStudentComponent } from './pages/import-student/import-student.component';
import { ActivityImportStudentComponent } from './pages/activity/activity-import-student/activity-import-student.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent,
    ActivityMasterComponent,
    ActivityCreateComponent,
    ActivityEditComponent,
    ActivityScannerComponent,
    ActivityComponent,
    ActivityManageComponent,
    ActivityDetailComponent,
    CheckinComponent,
    ImportStudentComponent,
    ActivityImportStudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OfficerRoutingModule,
    SharedModule,
    ZXingScannerModule
  ]
})
export class OfficerModule { }

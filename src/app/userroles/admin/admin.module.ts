import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdminRoutingModule } from './admin-routing.module';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { ActivityDetailComponent } from './pages/activity/activity-detail/activity-detail.component';
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';
import { UserComponent } from './pages/user/user.component';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatNativeDateModule } from '@angular/material/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { AgencyMasterComponent } from './pages/agency/agency-master/agency-master.component';
import { ActivitytypeMasterComponent } from './pages/activitytype/activitytype-master/activitytype-master.component';
import { FacultyMasterComponent } from './pages/faculty/faculty-master/faculty-master.component';
import { AgencyEditComponent } from './pages/agency/agency-edit/agency-edit.component';
import { AgencyCreateComponent } from './pages/agency/agency-create/agency-create.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranscriptPreviewComponent } from './pages/transcript/transcript-preview/transcript-preview.component';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { FacultyCreateComponent } from './pages/faculty/faculty-create/faculty-create.component';
import { FacultyEditComponent } from './pages/faculty/faculty-edit/faculty-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserListItemComponent } from './pages/user/user-list-item/user-list-item.component';
import { ActivityTicketComponent } from './pages/activity/activity-ticket/activity-ticket.component';

@NgModule({
  declarations: [
    DefaultPageComponent,
    DashboardComponent,
    ActivityMasterComponent,
    UserProfileComponent,
    ActivityCreateComponent,
    ActivityEditComponent,
    ActivityDetailComponent,
    ActivityManageComponent,
    UserComponent,
    CheckinComponent,
    AgencyMasterComponent,
    ActivitytypeMasterComponent,
    FacultyMasterComponent,
    AgencyEditComponent,
    AgencyCreateComponent,
    TranscriptPreviewComponent,
    ActivityComponent,
    FacultyCreateComponent,
    FacultyEditComponent,
    UserListComponent,
    UserListItemComponent,
    ActivityTicketComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    // MatTooltipModule,
    // MatDialogModule,
    // MatNativeDateModule,
    SharedModule,
    ZXingScannerModule
  ],
})
export class AdminModule {}

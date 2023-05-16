import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatNativeDateModule } from '@angular/material/core';

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
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // MatTooltipModule,
    // MatDialogModule,
    // MatNativeDateModule,
    SharedModule,
  ],
})
export class AdminModule {}

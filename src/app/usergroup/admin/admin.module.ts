import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';


@NgModule({
  declarations: [
    DefaultPageComponent,
    DashboardComponent,
    ActivityMasterComponent,
    UserProfileComponent,
    ActivityCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }

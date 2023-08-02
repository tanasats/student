import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { ActivityDetailsComponent } from './pages/activity/activity-details/activity-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckCreditComponent } from './pages/check-credit/check-credit.component';
import { ActivityManageComponent } from './pages/activity/activity-manage/activity-manage.component';
import { ActivityComponent } from './pages/activity/activity/activity.component';
import { ActivityViewComponent } from './pages/activity/activity-view/activity-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent,
    ActivityMasterComponent,
    ActivityDetailsComponent,
    CheckCreditComponent,
    ActivityManageComponent,
    ActivityComponent,
    ActivityViewComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
  ]
})
export class StudentModule { }

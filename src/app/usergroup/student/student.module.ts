import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { ActivityMasterComponent } from './pages/activity-master/activity-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityDetailsComponent } from './pages/activity-details/activity-details.component';
import { CheckCreditComponent } from './pages/check-credit/check-credit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent,
    ActivityMasterComponent,
    ActivityDetailsComponent,
    CheckCreditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
  ]
})
export class StudentModule { }

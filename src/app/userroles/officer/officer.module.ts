import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerRoutingModule } from './officer-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';
import { ActivityMasterComponent } from './pages/activity/activity-master/activity-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityCreateComponent } from './pages/activity/activity-create/activity-create.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { ActivityManagerComponent } from './pages/activity/activity-manager/activity-manager.component';
import { ActivityScannerComponent } from './pages/activity/activity-scanner/activity-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent,
    ActivityMasterComponent,
    ActivityCreateComponent,
    ActivityEditComponent,
    ActivityManagerComponent,
    ActivityScannerComponent
  ],
  imports: [
    CommonModule,
    OfficerRoutingModule,
    SharedModule,
    ZXingScannerModule
  ]
})
export class OfficerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerRoutingModule } from './officer-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent
  ],
  imports: [
    CommonModule,
    OfficerRoutingModule,
  ]
})
export class OfficerModule { }

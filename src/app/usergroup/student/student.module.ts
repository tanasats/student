import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultPageComponent } from './template/default-page/default-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultPageComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
  ]
})
export class StudentModule { }

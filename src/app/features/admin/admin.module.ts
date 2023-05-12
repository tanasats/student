import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from 'src/app/theme/theme.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityCreateComponent } from './pages/activity-create/activity-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEditorModule } from 'ngx-editor';




@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ActivityComponent,
    UserProfileComponent,
    ActivityCreateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgSelectModule,
    NgxEditorModule,
  ],
})
export class AdminModule { }

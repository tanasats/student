import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
 
import { ThemeModule } from './theme/theme.module';
import { NgChartsModule } from 'ng2-charts';
import { TestChartComponent } from './theme/pages/test-chart/test-chart.component';
import { TestComponent } from './theme/pages/test/test.component';
import { ToasterComponent } from './service/toaster/toaster.component';
import { ToasterContainerComponent } from './service/toaster/toaster-container.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './theme/pages/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEditorModule } from 'ngx-editor';

//import { AdminModule } from './features/admin/admin.module';
import { AdminModule } from './usergroup/admin/admin.module';
import { StudentModule } from './usergroup/student/student.module';
import { OfficerModule } from './usergroup/officer/officer.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    TestChartComponent,
    TestComponent,
    ToasterComponent,
    ToasterContainerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ThemeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    NgbDatepickerModule,
    NgSelectModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    MatTooltipModule,
   
    

    AdminModule,
    OfficerModule,
    StudentModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

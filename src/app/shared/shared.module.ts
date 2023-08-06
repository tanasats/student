import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaidatePipe } from './pipes/thaidate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffcanvasTestComponent } from './components/offcanvas/offcanvas-test/offcanvas-test.component';
import { NgbdateShowPipe } from './pipes/ngbdate-show.pipe';
import { ActivityCardListComponent } from './components/activity/activity-card-list/activity-card-list.component';
import { ActivityCardListItemComponent } from './components/activity/activity-card-list-item/activity-card-list-item.component';
import { ActivityDetailComponent } from './components/activity/activity-detail/activity-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivityAgencyFormInputComponent } from './components/activity/activity-agency-form-input/activity-agency-form-input.component';
import { ActivityTypeFormInputComponent } from './components/activity/activity-type-form-input/activity-type-form-input.component';
import { ActivityTermFormInputComponent } from './components/activity/activity-term-form-input/activity-term-form-input.component';
import { DatepickerFormInputComponent } from './components/activity/datepicker-form-input/datepicker-form-input.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormInputDateComponent } from './components/form/form-input-date/form-input-date.component';
import { FormInputTextComponent } from './components/form/form-input-text/form-input-text.component';
import { FormTextareaComponent } from './components/form/form-textarea/form-textarea.component';
import { FormButtonSubmitComponent } from './components/form/form-button-submit/form-button-submit.component';
import { ActivityYearFormInputComponent } from './components/activity/activity-year-form-input/activity-year-form-input.component';
import { OffcanvasFacultySelectComponent } from './components/offcanvas/offcanvas-faculty-select/offcanvas-faculty-select.component';
import { ActivityFacultyFormInputComponent } from './components/activity/activity-faculty-form-input/activity-faculty-form-input.component';
import { ActivityViewDetailsComponent } from './components/activity/activity-view-details/activity-view-details.component';
import { ActivityViewDetailsItemComponent } from './components/activity/activity-view-details-item/activity-view-details-item.component';
import { ReadmorePipe } from './pipes/readmore.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormInputNumberComponent } from './components/form/form-input-number/form-input-number.component';
import { FormInputFloatComponent } from './components/form/form-input-float/form-input-float.component';
import { DialogEnrollStudentConfirmComponent } from './components/dialogs/form/dialog-enroll-student-confirm/dialog-enroll-student-confirm.component';
import { DialogWarningConfirmComponent } from './components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { DialogTokenShowComponent } from './components/dialogs/info/dialog-token-show/dialog-token-show.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule} from '@angular/material/tabs';
import { UserViewTableComponent } from './components/user/user-view-table/user-view-table.component';
import { UserViewTableItemComponent } from './components/user/user-view-table-item/user-view-table-item.component';
import { FormInputFilesComponent } from './components/form/form-input-files/form-input-files.component';
import { FileListItemComponent } from './components/listitems/file-list-item/file-list-item.component';
import { ActivityListComponent } from './components/activity/activity-list/activity-list.component';
import { ActivityListItemComponent } from './components/activity/activity-list-item/activity-list-item.component';
import { PaginationLinkComponent } from './components/pagination-link/pagination-link.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FileDescriptionComponent } from './components/dialogs/form/file-description/file-description.component';
import { FormInputImageComponent } from './components/form/form-input-image/form-input-image.component';
import { AgencyListComponent } from './components/agency/agency-list/agency-list.component';
import { AgencyListItemComponent } from './components/agency/agency-list-item/agency-list-item.component';
import { ActivitytypeListComponent } from './components/activitytype/activitytype-list/activitytype-list.component';
import { ActivitytypeListItemComponent } from './components/activitytype/activitytype-list-item/activitytype-list-item.component';
import { FacultyListComponent } from './components/faculty/faculty-list/faculty-list.component';
import { FacultyListItemComponent } from './components/faculty/faculty-list-item/faculty-list-item.component';
import { ToolsbarControlListComponent } from './components/toolsbar-control-list/toolsbar-control-list.component';
import { FormInputSelectComponent } from './components/form/form-input-select/form-input-select.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { ActivitySkillFormInputComponent } from './components/activity/activity-skill-form-input/activity-skill-form-input.component';
import { ActivityToolbarComponent } from './components/activity/activity-toolbar/activity-toolbar.component';
import { FormInputPicfileComponent } from './components/form/form-input-picfile/form-input-picfile.component';
import { ActivityItemToolbarComponent } from './components/activity/activity-item-toolbar/activity-item-toolbar.component';
import { DialogInfoConfirmComponent } from './components/dialogs/confirm/dialog-info-confirm/dialog-info-confirm.component';
import { OffcanvasTicketComponent } from './components/offcanvas/offcanvas-ticket/offcanvas-ticket.component';
import { ActivityItemDetailComponent } from './components/activity/activity-item-detail/activity-item-detail.component';
import { EnroleListComponent } from './components/enrole/enrole-list/enrole-list.component';
import { EnroleListItemComponent } from './components/enrole/enrole-list-item/enrole-list-item.component';
import { OffcanvasStudentEnrollComponent } from './components/offcanvas/offcanvas-student-enroll/offcanvas-student-enroll.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketListItemComponent } from './components/ticket/ticket-list-item/ticket-list-item.component';
import { OffcanvasTicketGenerateComponent } from './components/offcanvas/offcanvas-ticket-generate/offcanvas-ticket-generate.component';

@NgModule({
  declarations: [
    ThaidatePipe,
    ReadmorePipe,

    OffcanvasTestComponent,
    NgbdateShowPipe,

    ActivityCardListComponent,
    ActivityCardListItemComponent,
    ActivityDetailComponent,
    ActivityAgencyFormInputComponent,
    ActivityTypeFormInputComponent,
    ActivityTermFormInputComponent,
    ActivityFacultyFormInputComponent,
    ActivityToolbarComponent,
    DatepickerFormInputComponent,
    FormInputDateComponent,
    FormInputTextComponent,
    FormTextareaComponent,
    FormButtonSubmitComponent,
    ActivityYearFormInputComponent,
    OffcanvasFacultySelectComponent,
    ActivityViewDetailsComponent,
    ActivityViewDetailsItemComponent,
    ReadmorePipe,
    FormInputNumberComponent,
    FormInputFloatComponent,
    DialogEnrollStudentConfirmComponent,
    DialogWarningConfirmComponent,
    DialogTokenShowComponent,
    UserViewTableComponent,
    UserViewTableItemComponent,
    FormInputFilesComponent,
    FileListItemComponent,
    ActivityListComponent,
    ActivityListItemComponent,
    PaginationLinkComponent,
    FileDescriptionComponent,
    FormInputImageComponent,
    AgencyListComponent,
    AgencyListItemComponent,
    ActivitytypeListComponent,
    ActivitytypeListItemComponent,
    FacultyListComponent,
    FacultyListItemComponent,
    ToolsbarControlListComponent,
    FormInputSelectComponent,
    PaginationPipe,
    ActivitySkillFormInputComponent,
    ActivityToolbarComponent,
    FormInputPicfileComponent,
    ActivityItemToolbarComponent,
    DialogInfoConfirmComponent,
    OffcanvasTicketComponent,
    ActivityItemDetailComponent,
    EnroleListComponent,
    EnroleListItemComponent,
    OffcanvasStudentEnrollComponent,
    TicketListComponent,
    TicketListItemComponent,
    OffcanvasTicketGenerateComponent,

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTooltipModule, 
    MatTabsModule,
    QRCodeModule,

  ],
  exports:[
    ThaidatePipe,
    NgbdateShowPipe,
    OffcanvasTestComponent,
    ActivityCardListComponent,
    ActivityAgencyFormInputComponent,
    ActivityTypeFormInputComponent,
    ActivityTermFormInputComponent,
    ActivityFacultyFormInputComponent,
    ActivityToolbarComponent,
    DatepickerFormInputComponent,
    FormInputDateComponent,
    FormInputTextComponent,
    FormTextareaComponent,
    FormButtonSubmitComponent,
    ActivityYearFormInputComponent,
    OffcanvasFacultySelectComponent,
    ActivityViewDetailsComponent,
    ActivityViewDetailsItemComponent,
    FormInputNumberComponent,
    FormInputFloatComponent,
    MatTooltipModule,
    MatTabsModule,
    UserViewTableComponent,
    UserViewTableItemComponent,
    FormInputFilesComponent,
    ActivityListComponent,
    ActivityListItemComponent,
    PaginationLinkComponent,
    FormInputImageComponent,
    AgencyListComponent,
    AgencyListItemComponent,
    ActivitytypeListComponent,
    ActivitytypeListItemComponent,
    FacultyListComponent,
    FacultyListItemComponent,
    ToolsbarControlListComponent,
    FormInputSelectComponent,
    ActivitySkillFormInputComponent,
    FormInputPicfileComponent,
    ActivityItemToolbarComponent,
    DialogInfoConfirmComponent,
    OffcanvasTicketComponent,
    ActivityItemDetailComponent,
    EnroleListComponent,
    EnroleListItemComponent,
    OffcanvasStudentEnrollComponent,
    TicketListComponent,
    TicketListItemComponent,
    OffcanvasTicketGenerateComponent,
  ]
})
export class SharedModule { }

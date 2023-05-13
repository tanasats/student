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
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormInputNumberComponent } from './components/form/form-input-number/form-input-number.component';
import { FormInputFloatComponent } from './components/form/form-input-float/form-input-float.component';

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
    ConfirmDialogComponent,
    FormInputNumberComponent,
    FormInputFloatComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
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
    DatepickerFormInputComponent,
    FormInputDateComponent,
    FormInputTextComponent,
    FormTextareaComponent,
    FormButtonSubmitComponent,
    ActivityYearFormInputComponent,
    OffcanvasFacultySelectComponent,
    ActivityViewDetailsComponent,
    ActivityViewDetailsItemComponent,
    ConfirmDialogComponent,
    FormInputNumberComponent,
    FormInputFloatComponent,
  ]
})
export class SharedModule { }

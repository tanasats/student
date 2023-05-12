import { Component, Input } from '@angular/core';
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDatepickerModule,
	NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'datepicker-form-input',
  templateUrl: './datepicker-form-input.component.html',
  styleUrls: ['./datepicker-form-input.component.scss']
})
export class DatepickerFormInputComponent {
  @Input() id?:any;
  @Input() label:string="_LABEL_"
  model!: NgbDateStruct;
constructor(
  private ngbCalendar: NgbCalendar, 
  private dateAdapter: NgbDateAdapter<string>,
){}

}

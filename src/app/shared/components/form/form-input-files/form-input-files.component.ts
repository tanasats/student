import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input-files',
  templateUrl: './form-input-files.component.html',
  styleUrls: ['./form-input-files.component.scss'],
})
export class FormInputFilesComponent {
  @Input() files?: any;
  @Input() title: string = 'แนบไฟล์';
  public uniqueid: string;
  constructor() {
    let randid = (Math.random() + 1).toString(36).substring(2);
    this.uniqueid = randid;
  }
_fileChange(event:any){
  console.log(event.target.files[0]);
}
}

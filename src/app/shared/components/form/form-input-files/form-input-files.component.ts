import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDescriptionComponent } from '../../dialogs/form/file-description/file-description.component';
import { FileService } from 'src/app/service/file.service';
import { FormGroup } from '@angular/forms';
import { DocfileService } from 'src/app/service/docfile.service';
import { CurrentUserService } from 'src/app/service/current-user.service';

@Component({
  selector: 'form-input-files',
  templateUrl: './form-input-files.component.html',
  styleUrls: ['./form-input-files.component.scss'],
})
export class FormInputFilesComponent {
  @Input() files?: any;
  @Input() title: string = 'แนบไฟล์';
  @Input() user_id:number=0;
  @Input() table_name:string="";
  @Input() table_id:string="";

  @Output() onFileSave = new EventEmitter<any>();

  @ViewChild('inputFile')
  myInputFile!: ElementRef;

  public uniqueid: string;

  constructor(
    private dialog: MatDialog,
    //private fileservice:FileService
    private docfileservice: DocfileService,
    private currentuser:CurrentUserService
  ) {
    let randid = (Math.random() + 1).toString(36).substring(2);
    this.uniqueid = randid;
    
  }

  _fileChange(event: any) {
    console.log(event.target.files[0]);
    const file: File = event.target.files[0];

    this.dialog
      .open(FileDescriptionComponent, {
        data: {
          docfile_title: file.name.split('.')[0],
          docfile_description: '',
          docfile_filename: file.name,
          
        },
        width:'80%',
        minWidth:'300px',
      })
      .afterClosed()
      .subscribe((data) => {
        console.log('dialog file description data:', data);
        //upload
        if (data === false) {
          this.myInputFile.nativeElement.value = '';
          return;
        }
        let user = this.currentuser.getdata;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('docfile_title', data.docfile_title);
        formData.append('docfile_description', data.docfile_description);
        formData.append('docfile_filename',file.name);
        formData.append('docfile_ref_user_id',user.user_id.toString());
        formData.append('docfile_ref_table_name',this.table_name);
        formData.append('docfile_ref_table_id',this.table_id);

        this.docfileservice.upload(formData).subscribe({
          next: (res) => {
            console.log('docfileservice.upload res:', res);
            this.myInputFile.nativeElement.value="";
            this.onFileSave.emit(true);
          },
          error: (err) => {
            console.log('err:', err);
          },
        });
      });
  }
}

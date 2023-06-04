import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-description',
  templateUrl: './file-description.component.html',
  styleUrls: ['./file-description.component.scss']
})
export class FileDescriptionComponent {
public fg:FormGroup;
//public filename:string;

constructor(
  private fb:FormBuilder,
  private dialogRef:MatDialogRef<any>,
  @Inject(MAT_DIALOG_DATA)public data: any
  ) { 
  //console.log(data);
  this.fg=fb.group({
    //docfile_id : data.docfile_id,
    docfile_title: data.docfile_title,
    docfile_description:data.docfile_description,
    docfile_filename: data.docfile_filename
  })
  //this.filename=data.docfilt_filename;
}


_onClose(){
  this.dialogRef.close(false);
}

_onSave(){
  if (this.fg.valid) {
    this.dialogRef.close(this.fg.getRawValue());
  }
}

} //class
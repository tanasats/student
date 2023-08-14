import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDescriptionComponent } from '../../dialogs/form/file-description/file-description.component';
import { FileService } from 'src/app/service/file.service';
import { FormGroup } from '@angular/forms';
import { DocfileService } from 'src/app/service/docfile.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ActivityService } from 'src/app/service/activity.service';
import { ImagefileService } from 'src/app/service/imagefile.service';

@Component({
  selector: 'unused-form-input-image',
  templateUrl: './form-input-image.component.html',
  styleUrls: ['./form-input-image.component.scss']
})
export class FormInputImageComponent {
  @Input() fc?: any;
  @Input() title: string = 'แนบไฟล์';
  @Input() user_id:number=0;
  @Input() table_name:string="";
  @Input() table_id:string="";

  @Output() onImageSave = new EventEmitter<any>();
  public uniqueid: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  fileToUpload!: File;

  @ViewChild('newFileInput') newFileInput!:ElementRef;
  newFileInputsrc:string='';

  


  constructor(
    private dialog: MatDialog,
    private imagefileservice:ImagefileService,
    private currentuser:CurrentUserService,
    private activityservice:ActivityService,
  ) {
    let randid = (Math.random() + 1).toString(36).substring(2);
    this.uniqueid = randid;
    
  }

  // onFileChange(event:any) {
  //   const reader = new FileReader();
  //   if(event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.newFileInputsrc = reader.result as string;
  //     };
  //   }
  // }

  // best practies --------------
  // handleFileInput(event:any) {
  //   const fileList: FileList = event.target.files;
  //   console.log(fileList);
  //   if (fileList.length > 0) {
  //     const file: File = fileList[0];
  //     this.fileToUpload = file;
  //   }
  // }


  fileChangeEventHeader(fileInput:any) {
    this.fileToUpload=fileInput.target.files[0];
    const oFReader = new FileReader();
    oFReader.readAsDataURL(fileInput.target.files[0]);
    oFReader.onload = (event: any) => {
      this.newFileInputsrc = oFReader.result as string;
      
      var tempimage = new Image();
      tempimage.src = event.target.result;

      tempimage.onload = function () {
        console.log(`width : ${tempimage.width} px`, `height: ${tempimage.height} px`);
        


      };
    };
  }


  // compressImage(src:string, newX:number, newY:number) {
  //   return new Promise((res, rej) => {
  //     const img = new Image();
  //     img.src = src;
  //     img.onload = () => {
  //       const elem = document.createElement('canvas');
  //       elem.width = newX;
  //       elem.height = newY;
  //       const ctx = elem.getContext('2d');
  //       ctx.drawImage(img, 0, 0, newX, newY);
  //       const data = ctx.canvas.toDataURL();
  //       res(data);
  //     }
  //     img.onerror = error => rej(error);
  //   })
  // }



onUploadImage(){
  console.log("on upload image");
  console.log("event",event);
  const file: File = this.fileToUpload;
  const formData: FormData = new FormData();
  formData.append("file",file,file.name);
  this.imagefileservice.upload(formData).subscribe({
    next:(res)=>{
      // ส่ง emit ออกไปทำที่ parent component
      this.newFileInputsrc='';
      this.onImageSave.emit(res.file.filename);
      
    },
    error:(err)=>{
      console.log("upload image err:",err);
    }
  })
}


  
}

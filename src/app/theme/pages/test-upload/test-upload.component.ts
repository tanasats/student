import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent {
  //filesToUpload: Array<File>;
  fileToUpload:File = {} as File;
  fileName = '';

  public formUpload:FormGroup

  constructor(
    private fileService:FileService,
    private fb:FormBuilder,
  ){
    //this.filesToUpload=[];
    this.formUpload = this.fb.group({
        file: [null, []],
        caption: [null, []],
      });
  }

//   upload() {
//     this.makeFileRequest("http://localhost:3001/uploads", [], this.filesToUpload).then((result) => {
//         console.log(result);
//     }, (error) => {
//         console.error(error);
//     });
// }

fileChangeEvent(fileInput: any){
    //this.filesToUpload = <Array<File>> fileInput.target.files;
    this.fileToUpload = fileInput.target.files[0];
    console.log("fileToUpload: ",fileInput.target.files[0])
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}

// onFileSelected(event:any) {
// //onFileSelected(event: { target: { files: File[]; }; }) {
//   const file:File = event.target.files[0];
//   if (file) {
//       this.fileName = file.name;
//       const formData = new FormData();
//       formData.append("thumbnail", file);
//       //const upload$ = this.http.post("/api/thumbnail-upload", formData);
//       //upload$.subscribe();
//   }
// }





onFileUpload(){
    //const file:File = event.target.files[0];
    const file:File = this.fileToUpload;
    const formData:FormData = new FormData();
    formData.append("file",file,file.name);
    formData.append("caption","xxxxxx");

    this.formUpload.controls['file'].setValue(file);

    this.fileService.upload(this.formUpload.getRawValue).subscribe({
        next: (res)=>{
            console.log("res:",res);
        },
        error: (err)=>{
            console.log("err:",err);
        }
        
    })
}

onSubmitUpload() {
    console.log('submitUpload()');
    let formData: FormData = new FormData();
    let file: File = this.fileToUpload;
    let caption = this.formUpload.get('caption')?.value;
    formData.append('id', "99");
    if (file.size > 0) 
        formData.append('file', file, Date.now() + '.png');
    if (typeof caption === 'string') 
        formData.append('caption', caption);

        this.fileService.upload(formData).subscribe({
            next: (res)=>{
                console.log("res:",res);
            },
            error: (err)=>{
                console.log("err:",err);
            }
            
        })

  }













public image:File={} as File;
public choosen:boolean=false;
public submited:boolean=false;

  fileChoosen(event:any){
    if(event.target.value){
        this.image = <File>event.target.files[0];
        this.choosen = true;
    }
  }

submitPhoto(){
    let fd = new FormData();
    this.submited = true;
    if(this.image){
        fd.append('file',this.image,this.image.name);
        this.fileService.upload(fd).subscribe({
            next:(res)=>{
                console.log("res:",res);
            },
            error:(err)=>{
                console.log("err:",err);
            }
        })
    }

}

}

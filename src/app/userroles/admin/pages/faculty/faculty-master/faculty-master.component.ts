import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FacultyService } from 'src/app/service/faculty.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { APPLABEL } from 'src/environments/environment';

@Component({
  selector: 'app-faculty-master',
  templateUrl: './faculty-master.component.html',
  styleUrls: ['./faculty-master.component.scss']
})
export class FacultyMasterComponent {
  public items:any;
  public itemEdit:any=null;
  public isCreate:boolean=false;

  public fc!:FormGroup;

  constructor(
    private formbuilder:FormBuilder,
    private facultyservice:FacultyService,
    private toaster:ToasterService
  ){
    this.initFormData();
    this.loadData();
  }

  loadData() {
    this.facultyservice.getall().subscribe({
      next:(res)=>{
        console.log("faculty res:",res);
        this.items=res;
      },
      error:(err)=>{
        this.toaster.show("error",err);
      }
    })
  }

  initFormData() {
    this.fc = this.formbuilder.group({
      faculty_id: [null, []],
      faculty_name: [null, []],
      faculty_name_en: [null,[]],
      faculty_group:[null,[]]
    });
  }  

onCreate(isOnCreate:any){
  console.log("onCreate():",isOnCreate);
  if(isOnCreate){
    this.isCreate=true;
  }
}
onSubmitCreate(event:any){
  this.facultyservice.create(this.fc.getRawValue()).subscribe({
    next: (res) => {
      if (res.affectedRows == 1) {
        this.loadData();
        this.isCreate = false;
        this.toaster.show('success', APPLABEL.SAVE_SUCCESS);
      }
    },
    error: (err) => {
      console.log(err);
      this.toaster.show('error', APPLABEL.SAVE_ERROR + err);
    },
  });
}
onCancelCreate(event:any){
  if(event){
    this.isCreate=false;
  }
}

onEdit(item:any){
  console.log("edit:",item);
  this.fc.patchValue(item);
}
onCancelEdit(event:any){
this.initFormData();
}
onSubmitEdit(item:any){
this.facultyservice.update(this.fc.getRawValue()).subscribe({
  next:(res)=>{
    if(res.affectedRows===1){
      this.loadData();
      this.initFormData();
      this.toaster.show('success', APPLABEL.SAVE_SUCCESS);
    }  
  },
  error:(err)=>{
    this.toaster.show("error",err);
    this.toaster.show('error', APPLABEL.SAVE_ERROR + err);
  }
})


}


 
onDelete(item:any){
  console.log("delete:",item);
}




}

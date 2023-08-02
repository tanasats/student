import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/service/dialog.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public data:any;
  bodyText = 'This text can be updated in modal 1';
  model_date_to?: string;
  
  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private toaster:ToasterService,
    private ngbCalendar: NgbCalendar, 
    private dateAdapter: NgbDateAdapter<string>,
    private offcanvas:OffcanvasService,
    private dialog:DialogService
  ) {}
  public frmUser:FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    console.log("ngOnInit()");
    this.userService.getall().subscribe({
      next: (res) => {
        console.log(res);
        this.data=res;
      },
      error: (err) => {
        console.log(err);
        this.toaster.show("error",err);
      }
    })
  }

  get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}
  
  onSubmit(form:FormGroup){
    console.log(form.value);
    this.toaster.show("success","username:"+form.value.username+" password:"+form.value.password,3000);
  }

  function_with_toggle_dialog(){
    console.log("function_with_taggle_dialog()");
    this.dialog.toggle('test-dialog');
  }

  function_with_toggle_offcanvas(){
    this.offcanvas.toggle('offcanvas-test');
  }

}

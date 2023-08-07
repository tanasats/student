import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogEnrollStudentConfirmComponent } from 'src/app/shared/components/dialogs/form/dialog-enroll-student-confirm/dialog-enroll-student-confirm.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent {
  public id: any;
  public state: any;
  public item: any;
  public currentuser!: ICurrentuser;
  public useractivity:any;
  public fileuri=environment.fileuri;

  constructor(
    private route: ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private router: Router,
    private dialog: MatDialog,
    private enrollservice: EnrollService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    if(!this.state){
      console.log("refresh jobs");
    }
    this.item = history.state.datas;
    this.item.activity_skill = JSON.parse(this.item.activity_skill);
    this.currentuser = this.currentuserservice.getdata;
    this.load_enroll();
  }

  load_enroll(){
    console.log("load_enroll()")
    this.enrollservice.useractivity(this.currentuser.user_id,this.item.activity_id).subscribe({
      next:([res])=>{
        console.log(res);
        if(res){
          this.useractivity=res;
        }
      },
      error:(err)=>{
         console.log("load useractivity err:",err);
      }
    })
  }

  onRegister(): void {
    console.log('register()');
    this.dialog
      .open(DialogEnrollStudentConfirmComponent, {
        data: {
          activity_id: this.item.activity_id,
          activity_code: this.item.activity_code,
          activity_name: this.item.activity_name,
          activity_date_form: this.item.activity_date_form,
          activity_year: this.item.activity_year,
          activity_term: this.item.activity_term,
          activity_place: this.item.activity_place,

          fullname: this.currentuser.fullname,
          email: this.currentuser.email,
          user_id: this.currentuser.user_id,
          studentcode: this.currentuser.studentcode,
        },
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('dialog afterClose res:', res);
          if(res){
            this.enrollservice.create(res).subscribe({
              next: (res) => {
                if (res.affectedRows === 1) {
                  this.toaster.show('success', 'ลงทะเบียนเรียบร้อยแล้ว');
                  this.load_enroll();
                }
              },
              error: (err) => {
                this.toaster.show('error', 'ผิดพลาด! ' + err);
              },
            });
          }
        },
        error: (err) => {
          console.log('err:', err);
        },
      });
  }

  goback() {
    this.router.navigate(["../../"], {relativeTo: this.route});
  }
}

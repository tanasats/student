import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { ActivityService } from 'src/app/service/activity.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogEnrollStudentConfirmComponent } from 'src/app/shared/components/dialogs/form/dialog-enroll-student-confirm/dialog-enroll-student-confirm.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss'],
})
export class ActivityDetailsComponent implements OnInit {
  public id: any;
  public state?: any;
  public item: any;
  public currentuser!: ICurrentuser;
  public useractivity:any;
  public fileuri=environment.fileuri;

  constructor(
    private location:Location,
    private route: ActivatedRoute,
    private currentuserservice: CurrentUserService,
    private activityservice: ActivityService,
    private router: Router,
    private dialog: MatDialog,
    private enrollservice: EnrollService,
    private toaster: ToasterService,
    public offcanvas:OffcanvasService,
  ) {
    // this.currentuser = this.currentuserservice.getdata;
    // this.state= location.getState();
    // this.item = this.state.datas;
    // console.log("constructor: ",this.item);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    console.log("state: ",this.state)
    if(!this.state){
      console.log("refresh jobs****************");
    }
    this.item = history.state.datas;
    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.item.activity_skill = JSON.parse(this.item.activity_skill);

    this.currentuser = this.currentuserservice.getdata;
    console.log("currentuser:",this.currentuser);
    if(this.currentuser.user_id){
      this.loadEnroll();
    }
    this.currentuserservice.userDataEmitter().subscribe((_currentuser:ICurrentuser)=>{
      console.log("activity-detail update currentuser data:",_currentuser);
      this.currentuser=_currentuser;
      this.loadEnroll()
    });
    
  }

  loadItem(){
    this.activityservice.getbyid(this.id).subscribe({
      next: ([res]) => {
        console.log("loadItem() :",res);
        this.item=res;
        this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
        this.item.activity_skill = JSON.parse(this.item.activity_skill);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadEnroll(){
    console.log("loadEnroll()")
    this.enrollservice.useractivity(this.currentuser.studentcode,this.item.activity_id).subscribe({
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
                  this.loadEnroll();
                  this.loadItem();
                  this.toaster.show('success', 'ลงทะเบียนเรียบร้อยแล้ว');
                }
              },
              error: (err) => {
                this.toaster.show('error', 'ผิดพลาด! ' + err);
              },
            });
          }else{
            console.log("xxxx res:",res);
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

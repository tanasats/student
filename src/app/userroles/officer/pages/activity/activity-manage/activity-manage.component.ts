import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { StudentService } from 'src/app/service/student.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { APPCONST, environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.scss']
})
export class ActivityManageComponent {
  public id: any;
  public state: any;
  public item: any;
  public registrant: any=[];
  public registrant_AB: any=[];
  public registrant_C: any=[];

  public student_search_keyword:string="";
  public student_search:any=[];


  public fileuri=environment.fileuri;

  constructor(
    private route:ActivatedRoute,
    private enrollservice:EnrollService,
    private activityService:ActivityService,
    private toaster:ToasterService,
    private studentService:StudentService,
    private offcanvas:OffcanvasService,
    private dialog: MatDialog,
  ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
    this.load_enroll();
    
    this.studentService.getall({}).subscribe({
      next: (res) => {
          console.log(res);
      },
      error: (err) =>{
          console.log(err);
      }
    })
  }
 
  load_enroll(){
    const datas = {
      activity_id:this.item.activity_id,
      keyword:'',
      page:1,
      //pagesize:1 //if this line comment the result use pagesize=10 by default
    }
    this.enrollservice.registrant(datas).subscribe({
      next:(res)=>{
        this.registrant=res.map((item:any)=>{
          const found = APPCONST.ENROLL_POSITION.find(obj=>{return obj.id==item.enroll_position})
          if(found) { item.enroll_position_name=found.name}
          else { item.enroll_position_name="*"}
          return item;
        });
        console.log("Registant: ",this.registrant);
        this.registrant_AB = this.registrant.filter((item:any)=>{return item.enroll_position=='A'||item.enroll_position=='B'});
        this.registrant_C = this.registrant.filter((item:any)=>{return item.enroll_position=='C'});
        console.log("Registant_AB: ",this.registrant_AB);
        console.log("Registant_C: ",this.registrant_C);
        
      },
      error:(err)=>{
        console.log("enroll.registrant err:",err);
      }
    });
  }

  onPublish(){
    this.item.activity_publish=!this.item.activity_publish;
    let datas = {
      'activity_id':this.item.activity_id,
      'activity_publish':this.item.activity_publish
    }
    this.activityService.update(datas).subscribe({
      next: (res)=>{
        console.log("res:",res);
        if(res.affectedRows){
          if(this.item.activity_publish){
            this.toaster.show("success","เผยแพร่กิจกรรม")
          }else{
            this.toaster.show("error","หยุดเผยแพร่กิจกรรม")
          }          
        }
      },
      error: (err)=>{
        console.log("err",err);
      }
    })
  }

 onSearchStudent(){
    this.studentService.getbyStudentcode(this.student_search_keyword).subscribe({
      next: (res) => {
        console.log("res: ",res);
      },
      error: (err) => {
        console.log("error: ",err);
      }
    })
 }

  onStudentEnroll(){
    this.offcanvas.toggle("offcanvas-student-enroll");
  }

  onStudentSelect(datas:any){
     console.log("student Select :",datas);

     if(datas.length===1){
        console.log("xxxx");
      const enroll_datas = {
        "activity_id": this.item.activity_id,
        "studentcode": datas[0].studentcode,
        "enroll_position":"A"
      };
      console.log("enroll_datas:",enroll_datas)
      this.enrollservice.create(enroll_datas).subscribe({
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
  }



  onDelete(item: any) { 
    console.log('onDelete()');
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          title: 'โปรดยืนยันการลบรายการ',
          description: 'รหัสนิสิต: '+item.studentcode,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(item);
          this.enrollservice.delete(item.enroll_id).subscribe({
            next: (res) => {
              console.log(res);
              if (res.affectedRows === 1) {
                this.toaster.show('success', 'ลยรายการเรียบร้อยแล้ว');
				        this.load_enroll();
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด: ' + err);
            },
          });
        }
      });
  }








}//class

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ExcelService } from 'src/app/service/excel.service';
import { StudentService } from 'src/app/service/student.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { APPCONST, environment } from 'src/environments/environment';
import { DialogInfoConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-info-confirm/dialog-info-confirm.component';
import { CheckinService } from 'src/app/service/checkin.service';
 
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
    private router: Router,
    private activeroute:ActivatedRoute,
    private enrollservice:EnrollService,
    private activityService:ActivityService,
    private toaster:ToasterService,
    private studentService:StudentService,
    private offcanvas:OffcanvasService,
    private dialog: MatDialog,
    private excelservice:ExcelService,
    private checkinservice:CheckinService,
  ){
    activeroute.params.subscribe((params)=>{
      console.log(params);
      console.log("invoke with url /:id =",params['id']);
      this.id=params['id'];
      this.load_enroll(params['id']);
    })
  }
  ngOnInit(): void {
    //this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.item.activity_skill = JSON.parse(this.item.activity_skill);

    //this.load_enroll();
    
    this.studentService.getall({}).subscribe({
      next: (res) => {
          console.log(res);
      },
      error: (err) =>{
          console.log(err);
      }
    })
  }
 
  load_enroll(activity_id:any){
    const datas = {
      activity_id:activity_id,
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
        // Sort ------
        this.registrant_C.sort((a:any, b:any) => {  
            return (a.cdate < b.cdate?1:-1)
        })
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
            this.load_enroll(this.id);
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
          icon: 'bi-trash',
          title: 'ต้องการลบรายการนี้ ใช่ หรือ ไม่',
          yes: 'ใช่',
          no: 'ไม่ใช่',
          description: 'รหัสนิสิต: <span class="text-primary">'+item.studentcode+'</span> <br>ชื่อ: <span class="text-primary">'+item.studentname+'</span>',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(item);
          this.enrollservice.delete(item.enroll_id,item.activity_id).subscribe({
            next: (res) => {
              console.log(res);
              if (res.affectedRows === 1) {
                this.toaster.show('success', 'ลบรายการเรียบร้อยแล้ว');
				        this.load_enroll(this.id);
              }
            },
            error: (err) => {
              this.toaster.show('error', 'ผิดพลาด: ' + err);
            },
          });
        }
      });
  }



  onSwitchTicket(){
    this.item.activity_ticket=!this.item.activity_ticket;
    let datas = {
      activity_id: this.item.activity_id,
      activity_ticket: this.item.activity_ticket,
    };
    this.activityService.update(datas).subscribe({
      next: (res) => {
        console.log('res:', res);
        if (res.affectedRows) {
          if (this.item.activity_ticket) {
            this.toaster.show('success', 'เข้าร่วมด้วยบัตรกิจกรรม');
          } else {
            this.toaster.show('success', 'เข้าร่วมด้วย QR Code');
          }
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  onExportExcel() {
    const exportdata = this.registrant_C.map((item:any)=>{ return {
      "รหัสนิสิต": item.studentcode,
      "ชื่อนิสิต": item.studentname,
      "คณะ": item.faculty_name,
      "สาขา": item.program,
      "สถานภาพ":"ผู้เข้าร่วมกิจกรรม",
      "วันที่ลงทะเบียน": item.cdate?new Date(item.cdate).toLocaleString():"-",
      "วันที่ยืนยันเข้าร่วม": item.activity_checkin_date?new Date(item.activity_checkin_date).toLocaleString():"-",
      "ผู้ยืนยันเข้าร่วม": item.mowner_name?item.mowner_name:"-"
    }});
    this.excelservice.exportToExcel(exportdata, 'รายชื่อผู้ลงทะเบียนเข้าร่วมกิจกรรม-' + this.item.activity_code);
  }

  onCancelWork(item: any) {
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          title: 'ยกเลิก สถานะดำเนินการ',
          description: 'กิจกรรม: ' + this.item.activity_name,
        },
      })
      .afterClosed()
      .subscribe((isclick) => {
        if (isclick) {
          let datas = {
            activity_id: this.item.activity_id,
            activity_publish: 0,
            activity_status: 'a',
          };
          this.activityService.update(datas).subscribe({
            next: (res) => {
              console.log('res:', res);
              if (res.affectedRows) {
                this.toaster.show("success","ดำเนินการยกเลิก สถานะดำเนินการแล้ว")
                this.router.navigate(['/officer/activity']);
              }
            },
            error: (err) => {
              console.log('err', err);
            },
          });
        }
      });
  }

  onScanner(event: any) {
    this.router.navigate(['/officer/activity/scanner/', this.item.activity_id], {
      //relativeTo: this.route,
      state: { datas: this.item },
    });
  }

  onImport(event:any){
    //console.log(event);
    this.router.navigate(['/officer/activity/import/',this.item.activity_id],{
      state: { datas: this.item },
    })
  }

  onCheckin(item:any){
    console.log('onCheckin()');
    this.dialog
      .open(DialogInfoConfirmComponent, {
        data: {
          icon: 'bi-clipboard2-check',
          title: 'บันทึกการเข้าร่วมกิจกรรม',
          yes: 'ใช่',
          no: 'ไม่ใช่',
          description: 'บันทึกการเข้าร่วมกิจกรรม '+item.studentcode+' '+item.studentname,
        },
      })
      .afterClosed()
      .subscribe((data) => {  
        if (data) {
          console.log(item);
          this.checkinservice.checkin(item.activity_id,item.enroll_token).subscribe({
            next: ([row]) => {
              console.log('checkin for :'+row)
              this.toaster.show("success",row.studentcode+" บันทึกการเข้าร่วมแล้ว")
              this.load_enroll(this.id);
            },
            error: (err) => {
              console.log(err);
              this.toaster.show("error","! เกิดข้อผิดพลาดในการดำเนินการ");
            }
          })
        }
      });
  }

  onCancelCheckin(item:any){
    console.log('onCancelCheckin()');
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          icon: 'bi-clipboard2-x',
          title: 'ยกเลิกการเข้าร่วมกิจกรรม',
          yes: 'ใช่',
          no: 'ไม่ใช่',
          description: 'ยกเลิกบันทึกการเข้าร่วมกิจกรรม '+item.studentcode+' '+item.studentname,
        },
      })
      .afterClosed()
      .subscribe((data) => {  
        if (data) {
          console.log(item);
          this.checkinservice.cancelcheckin(item.activity_id,item.enroll_token).subscribe({
            next: ([row]) => {
              this.toaster.show("success",row.studentcode+" ถูกยกเลิกบันทึกการเข้าร่วมกิจกรรมแล้ว")
              this.load_enroll(this.id);
            },
            error: (err) => {
              console.log(err);
              this.toaster.show("error","! เกิดข้อผิดพลาดในการดำเนินการ");
            }
          })
        }
      });
  }  

  onCheckinList(items:any){
    console.log('onCheckinList() :',items);
    this.dialog
      .open(DialogInfoConfirmComponent, {
        data: {
          icon: 'bi-clipboard2-check',
          title: 'บันทึกการเข้าร่วมกิจกรรม',
          yes: 'ใช่',
          no: 'ไม่ใช่',
          description: 'บันทึกการเข้าร่วมกิจกรรมที่เลือก ทั้งหมด '+items.length+' รายการ',
        },
      })
      .afterClosed()
      .subscribe((dialogresponse) => {  
        if (dialogresponse) {
          console.log(items);
          this.checkinservice.checkinlist(items).subscribe({
            next: ([row]) => {
              console.log('checkin for :'+row)
              this.toaster.show("success","บันทึกการเข้าร่วมแล้ว "+row.affectedRows+" รายการ")
              this.load_enroll(this.id);
            },
            error: (err) => {
              console.log(err);
              this.toaster.show("error","เกิดข้อผิดพลาดในการบันทึก");
            }
          })

        }
      });
  }

  onCancelCheckinList(items:any){
    console.log('onCancelCheckinList() :',items);
    this.dialog
      .open(DialogWarningConfirmComponent, {
        data: {
          icon: 'bi-clipboard2-x',
          title: 'ยกเลิกบันทึกการเข้าร่วมกิจกรรม',
          yes: 'ใช่',
          no: 'ไม่ใช่',
          description: 'ยกเลิกการเข้าร่วมกิจกรรมที่เลือก ทั้งหมด '+items.length+' รายการ',
        },
      })
      .afterClosed()
      .subscribe((dialogresponse) => {  
        if (dialogresponse) {
          console.log(items);
          this.checkinservice.cancelcheckinlist(items).subscribe({
            next: ([row]) => {
              console.log('checkin for :'+row)
              this.toaster.show("success","ยกเลิกการเข้าร่วมแล้ว "+row.affectedRows+" รายการ")
              this.load_enroll(this.id);
            },
            error: (err) => {
              console.log(err);
              this.toaster.show("error","เกิดข้อผิดพลาดในการบันทึก");
            }
          })

        }
      });
  }



  test(){
    console.log("test()");
  }
}//class

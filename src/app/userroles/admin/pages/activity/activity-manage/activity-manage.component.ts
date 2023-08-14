import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EnrollService } from 'src/app/service/enroll.service';
import { ExcelService } from 'src/app/service/excel.service';
import { StudentService } from 'src/app/service/student.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { DialogWarningConfirmComponent } from 'src/app/shared/components/dialogs/confirm/dialog-warning-confirm/dialog-warning-confirm.component';
import { APPCONST, environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-manage',
  templateUrl: './activity-manage.component.html',
  styleUrls: ['./activity-manage.component.scss'],
})
export class ActivityManageComponent implements OnInit {
  public id: any;
  public state: any;
  public item: any;
  public registrant: any = [];
  public fileuri: string = environment.fileuri;

  public registrant_AB: any=[];
  public registrant_C: any=[];

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private enrollservice: EnrollService,
    private activityService: ActivityService,
    private toaster: ToasterService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private excelservice:ExcelService,
  ) {}
  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.item.activity_skill = JSON.parse(this.item.activity_skill);

    this.refreshData();
    this.load_registrant();

    // this.studentService.getall({}).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  refreshData(){
    this.activityService.getbyid(this.id).subscribe({
      next: ([res])=>{
        console.log("loaddata() res:",res);
        this.item = res;
        this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
        this.item.activity_skill = JSON.parse(this.item.activity_skill);
      },
      error: (err)=>{
        console.log("loaddata() err:",err);
      }
    })
  }

  load_registrant() {
    const datas = {
      activity_id: this.item.activity_id,
      keyword: '',
      page: 1,
      //pagesize:1 //if this line comment the result use pagesize=10 by default
    };

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

  onPublish() {
    this.item.activity_publish = !this.item.activity_publish;
    let datas = {
      activity_id: this.item.activity_id,
      activity_publish: this.item.activity_publish,
    };
    this.activityService.update(datas).subscribe({
      next: (res) => {
        console.log('res:', res);
        if (res.affectedRows) {
          if (this.item.activity_publish) {
            this.toaster.show('success', 'เผยแพร่กิจกรรม');
          } else {
            this.toaster.show('error', 'หยุดเผยแพร่กิจกรรม');
          }
        }
      },
      error: (err) => {
        console.log('err', err);
      },
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
                this.router.navigate(['/admin/activity']);
              }
            },
            error: (err) => {
              console.log('err', err);
            },
          });
        }
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




  onFilter(){
    
  }

}

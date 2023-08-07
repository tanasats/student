import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';
import { EnrollService } from 'src/app/service/enroll.service';
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
  ) {}
  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;

    this.item.activity_faculty = JSON.parse(this.item.activity_faculty);
    this.item.activity_skill = JSON.parse(this.item.activity_skill);

    this.load_registrant();

    this.studentService.getall({}).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IActivity, IActivityFormGroup } from 'src/app/core/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
// import { Editor, Toolbar } from 'ngx-editor';
import { AgencyService } from 'src/app/service/agency.service';
import { ActivitytypeService } from 'src/app/service/activitytype.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ICurrentuser } from 'src/app/core/interface/currentuser';
import { DocfileService } from 'src/app/service/docfile.service';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss'],
})
export class ActivityCreateComponent implements OnInit {
  public _activity_code: string = '';
  public form: FormGroup;
  //public faculty_ref:any;
  public agency_ref: any;
  public activitytype_ref: any;
  public currentuser!: ICurrentuser;
  public docfile_list: any = [];

  // editor: Editor | undefined;
  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ];

  htmlContent = 'xxx';

  public offcanvas_faculty = 'offcanvas_faculty';

  // cities = [
  //     { id: 1, name: 'Vilnius' },
  //     { id: 2, name: 'Kaunas' },
  //     { id: 3, name: 'Peter'},
  //     { id: 4, name: 'Michael' },
  //     { id: 5, name: 'Jane' },
  // ];
  // activity_type = [
  //   { id: 1, name: 'กิจกรรมประเภทที่ 1' },
  //   { id: 2, name: 'กิจกรรมประเภทที่ 2' },
  //   { id: 3, name: 'กิจกรรมประเภทที่ 3'},
  //   { id: 4, name: 'กิจกรรมประเภทที่ 4' },
  //   { id: 5, name: 'กิจกรรมประเภทที่ 5' },
  // ];
  // agency = [
  //   { id: 1, name: 'หน่วยงาน/องค์กร 1' },
  //   { id: 2, name: 'หน่วยงาน/องค์กร 2' },
  //   { id: 3, name: 'หน่วยงาน/องค์กร 3'},
  //   { id: 4, name: 'หน่วยงาน/องค์กร 4' },
  //   { id: 5, name: 'หน่วยงาน/องค์กร 5' },
  // ];
  // faculty_ref = [
  //   { faculty_id: 1, faculty_name: 'คณะ 1',selected:false },
  //   { faculty_id: 2, faculty_name: 'คณะ 2',selected:false  },
  //   { faculty_id: 3, faculty_name: 'คณะ 3',selected:false },
  //   { faculty_id: 4, faculty_name: 'คณะ 4',selected:false  },
  //   { faculty_id: 5, faculty_name: 'คณะ 5',selected:false  },
  // ];

  // faculty_list:any[]=[];

  selectedCityId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private currentuserservice: CurrentUserService,
    private activityservice: ActivityService,
    private agencyservice: AgencyService,
    private docfileservice: DocfileService,
    private activitytypeservice: ActivitytypeService,
    public offcanvas: OffcanvasService,
    public toaster: ToasterService
  ) {
    this.form = this.fb.group({
      activity_id: [null, []],
      activity_code: [null, []],
      activity_year: [2566, [Validators.required]],
      activity_term: [null, [Validators.required]],
      activity_seq_term: [null, []],
      agency_code: [null, [Validators.required]],
      activitytype_code: [null, [Validators.required]],
      activity_name: [null, [Validators.required]],
      activity_description: [null, []],
      activity_date_from: [null, []],
      activity_date_to: [null, []],
      activity_place: [null, []],
      activity_hour: [null, []],
      activity_receive: [null, []],
      activity_skill: [APPCONST.SKILL, []],
      activity_faculty: [null, []],
      activity_picture: [null, []],
      activity_status: ['d', []],
      activity_budget_source: [null, []],
      activity_budget: [null, []],
      activity_budget_paid: [null, []],
      //activity_docfiles: [null, []],
      cowner: [null, []],
      mowner: [null, []],
    }) as unknown as IActivityFormGroup;
  }

  ngOnInit(): void {
    this._load_ref_data();
    //this._load_docfile();
    // this.editor = new Editor();
    this.form.controls['activity_year'].valueChanges.subscribe((x) => {
      this.genActivityCode();
    });
    this.form.controls['activity_term'].valueChanges.subscribe((x) => {
      this.genActivityCode();
    });
    this.form.controls['agency_code'].valueChanges.subscribe((x) => {
      this.genActivityCode();
    });
    this.form.controls['activitytype_code'].valueChanges.subscribe((x) => {
      this.genActivityCode();
    });
  }
  ngAfterContentInit() {
    this.currentuser = this.currentuserservice.getdata;
    //this.form.controls['activity_skill'].setValue(APPCONST.SKILL);
  }

  _load_ref_data() {
    console.log("load_ref_data()");
    this.agencyservice.getall().subscribe({
      next: (res) => {
        this.agency_ref = res.map((item: any) => {
          var obj: any = {};
          obj.id = item.agency_code;
          obj.name = item.agency_code + ' : ' + item.agency_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.activitytypeservice.getall().subscribe({
      next: (res) => {
        this.activitytype_ref = res.map((item: any) => {
          var obj: any = {};
          obj.id = item.activitytype_code;
          obj.name = item.activitytype_code + ' : ' + item.activitytype_name;
          return obj;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    APPCONST.SKILL.forEach((item:any)=>{item.checked=false});
    this.form.controls['activity_skill'].setValue(APPCONST.SKILL);
  }

  onFileSave(event: any) {
    console.log('onfileSave event:', event);
    if (event) {
      this._load_docfile();
    }
  }

  _load_docfile() {
    this.currentuser = this.currentuserservice.getdata;
    this.docfileservice
      .getbytable(
        'activity',
        this.form.controls['activity_id'].value,
        this.currentuser.user_id
      )
      .subscribe({
        next: (res) => {
          console.log('load_docfile res:', res);
          this.docfile_list = res;
        },
        error: (err) => {
          console.log('load_docfile err:', err);
        },
      });
  }



  genActivityCode() {
    let agency = this.form.controls['agency_code'].value || 'xxxx';
    let year = this.form.controls['activity_year'].value.toString();
    let term = (this.form.controls['activity_term'].value||'x').toString();
    let type = this.form.controls['activitytype_code'].value || 'x';
    let running = this.padLeft(
      this.form.controls['activity_seq_term'].value || '0',
      '0',
      2
    );
    this.form.controls['activity_code'].setValue(
      agency + year.substr(-2) + term + type + 'xx' //+ running
    );
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  // _onCancle() {
  //   this.router.navigate(['admin/activity']);
  // }
  _onCancel() {
    this.form.markAsUntouched();
    this.router.navigate(['/admin/activity']);
  }
  _onfacultySelectSave(items: any) {
    this.form.controls['activity_faculty'].setValue(items);
  }

  // _submit(){
  //   this.form.markAllAsTouched();
  //   if(this.form.valid){
  //     let datas = this.form.getRawValue();
  //     datas.activity_faculty=JSON.stringify(datas.activity_faculty);
  //     this.activityservice.create(datas).subscribe({
  //       next:(res)=>{
  //         console.log("activity service res:",res);
  //         if(res.affectedRows){ //affectedRows,insertId
  //           this.toaster.show("success","บันทึกข้อมูลเรียบร้อย");
  //           this.router.navigate(['../../']);
  //         }
  //       },
  //       error:(err)=>{
  //         console.log("activity service err:",err);
  //         this.toaster.show("error",err,7000)
  //       }
  //     });
  //   }else{
  //     this.toaster.show("error","กรุณากรอกข้อมูลให้ครบถ้วน")
  //   }
  // }

  onSubmit(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let datas = this.form.getRawValue();
      datas.activity_faculty = JSON.stringify(datas.activity_faculty);
      datas.activity_skill = JSON.stringify(datas.activity_skill);
      this.activityservice.update(datas).subscribe({
        next: (res) => {
          console.log('activity service update res:', res);
          if (res.affectedRows) {
            //affectedRows,insertId
            this.toaster.show('success', 'บันทึกข้อมูลเรียบร้อย');
            //this.router.navigate(['../../']);
          } else {
            this.toaster.show('error', 'การบันทึกข้อมูลผิดพลาด');
          }
        },
        error: (err) => {
          console.log('activity service err:', err);
          this.toaster.show('error', err, 7000);
        },
      });      
    }else{
      this.toaster.show('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }


  xonSubmit() {
    //this.form.markAllAsTouched();
    if (this.form.controls['activity_id'].value === null) {
      if(this.form.controls['activity_code'].value===null){
        this.form.markAllAsTouched();
        this.toaster.show("error","กรุณากรอกข้อมูลให้ครบถ้วน");
        return
      }
      this.activityservice
        .getnextseq(this.form.controls['activity_code'].value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.form.controls['activity_seq_term'].setValue(
              res.nextseq || '00'
            );
            const acode = this.form.controls['activity_code'].value.substr(0,8);
            this.form.controls['activity_code'].setValue(
              acode + this.padLeft(res.nextseq || 0, '0', 2)
            );
            this._onSaveDraft();
          },
          error: (err) => {
            console.log('error:', err);
          },
        });
    } else {
      this._onSaveUpdate();
    }
  }

  _onSaveUpdate() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let datas = this.form.getRawValue();
      datas.activity_faculty = JSON.stringify(datas.activity_faculty);
      datas.activity_skill = JSON.stringify(datas.activity_skill);
      this.activityservice.update(datas).subscribe({
        next: (res) => {
          console.log('activity service update res:', res);
          if (res.affectedRows) {
            //affectedRows,insertId
            this.toaster.show('success', 'บันทึกข้อมูลเรียบร้อย');
            this.router.navigate(['../../']);
          } else {
            this.toaster.show('error', 'การบันทึกข้อมูลผิดพลาด');
          }
        },
        error: (err) => {
          console.log('activity service err:', err);
          this.toaster.show('error', err, 7000);
        },
      });
    } else {
      this.toaster.show('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  _onSaveDraft() {
    this.form.markAllAsTouched();
    if (this.form.valid) {

      this.activityservice
        .getnextseq(this.form.controls['activity_code'].value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.form.controls['activity_seq_term'].setValue(
              res.nextseq || '00'
            );
            const acode = this.form.controls['activity_code'].value.substr(0,8);
            this.form.controls['activity_code'].setValue(
              acode + this.padLeft(res.nextseq || 0, '0', 2)
            );
            // SaveDraft----------------------
              let datas = this.form.getRawValue();
              datas.activity_faculty = JSON.stringify(datas.activity_faculty);
              datas.activity_skill = JSON.stringify(datas.activity_skill);
              //let user = this.currentuserservice.getdata;
              datas.cowner = this.currentuser.user_id;
              datas.mowner = this.currentuser.user_id;
              this.activityservice.create(datas).subscribe({
                next: (res) => {
                  console.log('activity service create res:', res);
                  if (res.affectedRows) {//res->affectedRows,insertId
                    
                    this.form.controls['activity_id'].setValue(res.insertId);
                    this.toaster.show('success', 'บันทึกข้อมูลร่างโครงการแล้ว', 7000);
                  }
                },
                error: (err) => {
                  console.log('activity service err:', err);
                  this.toaster.show('error', err, 7000);
                },
              });

          },
          error: (err) => { //getnextseq():err
            console.log('error:', err);
          },
        });


    } else { // not form.valid
      this.toaster.show('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }


  goBack() {
    this.router.navigate(['/admin/activity']);
  }

  onGoBack(){
    this.router.navigate(['/admin/activity']);
  }

  onImageSave(filename: any) {
    console.log(filename);
    const datas = {
      activity_id: this.form.controls['activity_id'].value,
      activity_picture: filename,
    };
    this.activityservice.update(datas).subscribe({
      next: (res) => {
        console.log('activity picture res:', res);
        //this.loadData();
        this.form.controls['activity_picture'].setValue(filename);
        this.toaster.show("success","Image Upload success");
      },
      error: (err) => {
        console.log('activity picure err:', err);
      },
    });
  }






} // class

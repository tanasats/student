import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EnrollService } from 'src/app/service/enroll.service';
import { RegdataService } from 'src/app/service/regdata.service';
import { ToasterService } from 'src/app/service/toaster/toaster.service';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-activity-import-student',
  templateUrl: './activity-import-student.component.html',
  styleUrls: ['./activity-import-student.component.scss']
})
export class ActivityImportStudentComponent implements OnInit{
  
  public id: any;
  public state: any;
  public item: any;
  public students:any[]=[];

  constructor(private regdata:RegdataService,
    private activeroute:ActivatedRoute,
    private router:Router,
    private toaster:ToasterService,
    private enroll:EnrollService,
    ){
      activeroute.params.subscribe((params)=>{
        console.log(params);
        console.log("invoke with url /:id params",params['id']);
      })
  }
  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
  }

  studentinfo(studentcode:string){
    this.regdata.studentinfo(studentcode).subscribe({
      next: ([res])=>{
        console.log("res: ",res);
        const student = this.students.find(student => student.studentcode===studentcode);
        student.studentname = res.STUDENTNAME+" "+res.STUDENTSURNAME;
        student.faculty = res.FACULTYNAME;
        student.selected=true;
        student.activity_id=this.id;
      },
      error: (err)=>{
        console.log("error: ",err);
      }
    })
  }

  async  studentVerify (datas:any[]){
    datas.forEach(async (item) =>{
       item.selected=false;
       this.studentinfo(item.studentcode);
    })
  }

  handleImport($event: any) {
    const files = $event.target.files;
    
    if (files.length) {
        const file = files[0];
        const filename = file.name.split(".");
        console.log("filename=",filename[0]);
        if(filename[0]!=this.item.activity_code){
          this.toaster.show("error","ชื่อไฟล์ไม่ตรงกันกับรหัสกิจกรรม !!");
        }
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                this.students = rows;
                this.studentVerify(rows);
            }
        }
        reader.readAsArrayBuffer(file);
    }
}

public get studentSelected(){
  // const count= this.students.reduce((acc,cur)=>{
  //   return acc + (cur.studentname !== null?1:0)
  // },0)
  return this.students.filter((item) => item.selected===true).length;
}

public onImport(){
  const datas = this.students.filter((item)=> item.selected===true);
  console.log('datas:',datas);
  this.enroll.enrollimport(datas).subscribe({
    next: (res) => {
        console.log("import success :",res);
        this.router.navigate(['/officer/activity/manage/',this.item.activity_id],{//relativeTo: this.route,
          state: { datas: this.item }, 
        });
        this.toaster.show("success","นำเข้าข้อมูลแล้ว");
    },
    error: (err) => {
        console.log("error :",err);
    }
  })
}

public onCancel(){
  this.router.navigate(['/officer/activity/manage/',this.item.activity_id],{//relativeTo: this.route,
    state: { datas: this.item },
  });
}

// handleExport() {
//   const headings = [[
//       'Movie',
//       'Category',
//       'Director',
//       'Rating'
//   ]];
//   const wb = utils.book_new();
//   const ws: any = utils.json_to_sheet([]);
//   utils.sheet_add_aoa(ws, headings);
//   utils.sheet_add_json(ws, this.students, { origin: 'A2', skipHeader: true });
//   utils.book_append_sheet(wb, ws, 'Report');
//   writeFile(wb, 'Movie Report.xlsx');
// }



}

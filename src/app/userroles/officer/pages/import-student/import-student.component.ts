import { Component } from '@angular/core';
import { RegdataService } from 'src/app/service/regdata.service';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss']
})
export class ImportStudentComponent {
  public students:any[]=[];

  constructor(private regdata:RegdataService){
    
  }

  studentinfo(studentcode:string){
    this.regdata.studentinfo(studentcode).subscribe({
      next: ([res])=>{
        console.log("res: ",res);
        const student = this.students.find(student => student.studentcode===studentcode);
        student.studentname = res.STUDENTNAME+" "+res.STUDENTSURNAME;
        student.faculty = res.FACULTYNAME;
      },
      error: (err)=>{
        console.log("error: ",err);
      }
    })
  }

  async  studentVerify (datas:any[]){
    datas.forEach(async (item) =>{
       this.studentinfo(item.studentcode);
    })
  }


  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
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

handleExport() {
  const headings = [[
      'Movie',
      'Category',
      'Director',
      'Rating'
  ]];
  const wb = utils.book_new();
  const ws: any = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws, headings);
  utils.sheet_add_json(ws, this.students, { origin: 'A2', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Report');
  writeFile(wb, 'Movie Report.xlsx');
}



}

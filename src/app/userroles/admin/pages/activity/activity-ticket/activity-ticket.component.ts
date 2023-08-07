import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/service/excel.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { TicketService } from 'src/app/service/ticket.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-activity-ticket',
  templateUrl: './activity-ticket.component.html',
  styleUrls: ['./activity-ticket.component.scss'],
})
export class ActivityTicketComponent implements OnInit {
  public id: any;
  public state: any;
  public item: any;
  public tickets: any = [];

  constructor(
    private activeroute: ActivatedRoute,
    private ticketservice: TicketService,
    private offcanvas: OffcanvasService,
    private excelservice: ExcelService
  ) {}
  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas;
    this.loadData();
  }

  loadData() {
    this.ticketservice.getbyid(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.tickets = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onGenTicket() {
    this.offcanvas.toggle('offcanvas-ticket-generate');
  }

  onSave_genTicket(success: any) {
    if (success) {
      this.loadData();
    }
  }

  onExportExcel() {
    const datas = this.tickets;
    this.excelservice.exportToExcel(datas, 'Ticket-' + this.item.activity_code);
  }

  onTest() {
    var doc = new jsPDF();
    doc.setFontSize(10);

    // var body = [
    //   ['SL.No', 'Product Name', 'Price', 'Model'],
    //   [1, 'I-phone', 75000, '2021'],
    //   [2, 'Realme', 25000, '2022'],
    //   [3, 'Oneplus', 30000, '2021'],
    //   ]
    // generate auto table with body
    // var y = 10;
    // doc.setLineWidth(2);
    // doc.text(200, y = y + 30, "Product detailed report");

    // doc.autoTable({
    // body: body,
    // startY: 70,
    // theme: 'grid',
    //         })

    //doc.text('Jspdf text! ภาษาไทย', 10, 10);
    // 

    var y = 25;
     for (let i = 0; i < this.tickets.length; i++) {
      doc.text('Activity code : ' +this.item.activity_code, 10, y + (i * 25));
       doc.text('Activity Key : ' +this.tickets[i].ticket_key, 10, y + 5 + (i * 25));
       doc.text('-------------------------------------------------------',10, y + 15 + (i * 25))
     }
    doc.save('test.pdf');
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}

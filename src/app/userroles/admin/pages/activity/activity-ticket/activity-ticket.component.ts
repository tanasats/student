import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/service/excel.service';
import { OffcanvasService } from 'src/app/service/offcanvas.service';
import { TicketService } from 'src/app/service/ticket.service';


@Component({
  selector: 'app-activity-ticket',
  templateUrl: './activity-ticket.component.html',
  styleUrls: ['./activity-ticket.component.scss']
})
export class ActivityTicketComponent implements OnInit {
  public id:any;
  public state:any;
  public item:any;
  public tickets:any=[];

  constructor(
  private activeroute:ActivatedRoute,
  private ticketservice:TicketService,
  private offcanvas:OffcanvasService,
  private excelservice:ExcelService,
  ){}
  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id');
    this.state = history.state;
    this.item = history.state.datas; 
    this.loadData();
  } 

  loadData(){
    this.ticketservice.getbyid(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.tickets=res;
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }


  onGenTicket(){
    this.offcanvas.toggle("offcanvas-ticket-generate")
  }

  onSave_genTicket(success:any){
    if(success){
      this.loadData();  
    }
  }

  onExportExcel(){
    const datas = this.tickets;
    this.excelservice.exportToExcel(datas,"Ticket-"+this.item.activity_code);
  }

}

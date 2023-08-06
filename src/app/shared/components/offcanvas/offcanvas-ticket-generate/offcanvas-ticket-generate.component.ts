import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'offcanvas-ticket-generate',
  templateUrl: './offcanvas-ticket-generate.component.html',
  styleUrls: ['./offcanvas-ticket-generate.component.scss'],
})
export class OffcanvasTicketGenerateComponent {
  id = 'offcanvas-ticket-generate';
  @Input() title?: string = 'สร้างบัตรกิจกรรม';
  @Input() activity_id?: number;
  @Input() activity_code?: string = '';
  @Input() activity_name?: string = '';

  @Output() onSave = new EventEmitter<any>();
  public inputNumber: number = 0;

  constructor(private el: ElementRef, private ticketservie: TicketService) {}

  ngAfterViewInit(): void {
    console.log('offcanvas: ngAfterViewInit()');
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector(
      '#' + this.id
    ) as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');
    button.innerText = 'Offcanvas Toggle';
    button.setAttribute('id', 'toggle-' + this.id);
    button.setAttribute('data-bs-toggle', 'offcanvas');
    button.setAttribute('data-bs-target', '#' + this.id);
    button.setAttribute('hidden', 'hidden');
    parentEl.appendChild(button);
  }

  _onSave() {
    let datas = { action: 'submit', msg: 'test submit from offcanvas' };
    this.onSave.emit({id:this.id,datas:datas})
    // let _close_btn: HTMLElement = document.getElementById('modal-close-'+this.id) as HTMLElement;
    // _close_btn.click();
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector(
      '#toggle-' + this.id
    ) as HTMLElement;
    btnElement.click();
  }
  
  _onClose(){
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector(
      '#toggle-' + this.id
    ) as HTMLElement;
    btnElement.click();
  }

  onGenTicket() {
    if (this.inputNumber > 0) {
      const datas = {
        number: this.inputNumber,
        activity_id: this.activity_id,
        activity_name: this.activity_name,
      };
      this.ticketservie.genTicket(datas).subscribe({
        next: (res) => {
          console.log("ticket service res:",res);
          if(res.affectedRows>0){
            this.onSave.emit(true);
          }else{
            this.onSave.emit(false);
          }
           this._onClose()
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

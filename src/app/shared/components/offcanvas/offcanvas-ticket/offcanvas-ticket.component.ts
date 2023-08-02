import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'offcanvas-ticket',
  templateUrl: './offcanvas-ticket.component.html',
  styleUrls: ['./offcanvas-ticket.component.scss']
})
export class OffcanvasTicketComponent {
  id = 'offcanvas-ticket'
  @Input() title?:string="บันทึก Activity Ticket";
  @Output() onSave =new EventEmitter<any>();

  constructor(private el: ElementRef){}

  ngAfterViewInit(): void {
    console.log('offcanvas: ngAfterViewInit()');
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector('#' + this.id) as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');
    button.innerText = 'Offcanvas Toggle';
    button.setAttribute('id', 'toggle-' + this.id);
    button.setAttribute('data-bs-toggle', 'offcanvas');
    button.setAttribute('data-bs-target', '#' + this.id);
    button.setAttribute('hidden', 'hidden');
    parentEl.appendChild(button);
  }

  _onSave(){
    let datas={action:"submit",msg:"test submit from offcanvas"}
    this.onSave.emit({id:this.id,datas:datas})
    // let _close_btn: HTMLElement = document.getElementById('modal-close-'+this.id) as HTMLElement;
    // _close_btn.click();
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#toggle-'+this.id) as HTMLElement;
    btnElement.click();
  }

}

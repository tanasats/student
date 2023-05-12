import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-offcanvas-test',
  templateUrl: './offcanvas-test.component.html',
  styleUrls: ['./offcanvas-test.component.scss']
})
export class OffcanvasTestComponent implements AfterViewInit  {
  @Input() id?:string;
  @Input() title?:string="เลือกคณะ/หน่วยงาน";
  @Output() onSave =new EventEmitter<any>();

  constructor( private el: ElementRef) { 
    //this._element = el.nativeElement;
    // this.title ??= "Modal Title";
    // this.label_confirm ??= "Confirm"; //if Undefined then assign default value
    // this.label_cancle ??= "Cancle";
  }
  ngAfterViewInit(): void {
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector('#offcanvas-header-'+this.id) as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');  
		button.innerText = "Dialog Toggle"; 
    button.setAttribute("id","offcanvas-toggle-"+this.id);
		button.setAttribute("data-bs-toggle","offcanvas");
		button.setAttribute("data-bs-target","#offcanvas"+this.id);
		button.setAttribute("hidden","hidden")
		//document.body.appendChild(button);
    parentEl.appendChild(button) 
		//button.click();
		//button.remove();
  }
 
  _onSave(){
    let datas={action:"submit",msg:"test submit from offcanvas"}
    this.onSave.emit({id:this.id,datas:datas})

    // let _close_btn: HTMLElement = document.getElementById('modal-close-'+this.id) as HTMLElement;
    // _close_btn.click();
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#offcanvas-toggle-'+this.id) as HTMLElement;
    btnElement.click();
  }

}

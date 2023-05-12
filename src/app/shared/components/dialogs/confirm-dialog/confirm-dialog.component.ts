import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit ,AfterViewInit{
  @Input() id?: string;
  @Input() title?:string;
  @Input() description?:string;
  @Input() label_cancle?:string;
  @Input() label_confirm?:string;
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancle = new EventEmitter<any>();

  //private _element: any;
  constructor( private el: ElementRef) { 
    //this._element = el.nativeElement;
    this.title ??= "Modal Title";
    this.label_confirm ??= "Confirm"; //if Undefined then assign default value
    this.label_cancle ??= "Cancle";
  }
  ngAfterViewInit(): void {
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector('#'+this.id+"Label") as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');  
		button.innerText = "Dialog Toggle"; 
    button.setAttribute("id","modal-toggle-"+this.id);
		button.setAttribute("data-bs-toggle","modal");
		button.setAttribute("data-bs-target","#"+this.id);
		button.setAttribute("hidden","hidden")
		//document.body.appendChild(button);
    parentEl.appendChild(button) 
		//button.click();
		//button.remove();
  }
  ngOnInit(): void {
    // let controlbtn = (<HTMLElement>this.el.nativeElement).querySelector('#modal-'+this.id) as HTMLElement;
    // console.log(controlbtn);
    // controlbtn.setAttribute("data-bs-target",""+this.id);
  }
  

  _onCancle(){
    let datas={action:"cancle",msg:"test cancle"}
    this.onCancle.emit(true)
  }

  _onConfirm(){
    let datas={action:"confirm",msg:"test"}
    this.onConfirm.emit({id:this.id,datas:datas})

    // let _close_btn: HTMLElement = document.getElementById('modal-close-'+this.id) as HTMLElement;
    // _close_btn.click();
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#modal-close-'+this.id) as HTMLElement;
    btnElement.click();
  }
}

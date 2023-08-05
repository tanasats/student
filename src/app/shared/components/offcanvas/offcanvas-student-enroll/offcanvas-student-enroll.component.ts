import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'offcanvas-student-enroll',
  templateUrl: './offcanvas-student-enroll.component.html',
  styleUrls: ['./offcanvas-student-enroll.component.scss']
})
export class OffcanvasStudentEnrollComponent {
  id = 'offcanvas-student-enroll';
  @Input() title: string = 'Offcanvas title';
  @Output() onSubmit = new EventEmitter<any>();

  public studentcode:string='';

  constructor(private el: ElementRef) {}

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
  _toggleMe() {
    //--close offcanvas--
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#toggle-' + this.id) as HTMLElement;
    btnElement.click();
  }

  _onClose(){
    this._toggleMe();
  }
  _onSubmit() {
    // your code -----
    const datas:any=[
      {"studentcode":this.studentcode}
    ];
    this.onSubmit.emit(datas);
  }
}

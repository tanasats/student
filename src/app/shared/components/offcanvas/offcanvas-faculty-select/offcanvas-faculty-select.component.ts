import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'offcanvas-faculty-select',
  templateUrl: './offcanvas-faculty-select.component.html',
  styleUrls: ['./offcanvas-faculty-select.component.scss']
})
export class OffcanvasFacultySelectComponent {
  @Input() id?: string = 'offcanvas-faculty-select';
  @Input() fc?: any;
  @Input() title?: string = 'เลือกคณะ/หน่วยงาน';
  @Input() items: any;
  @Output() onSave = new EventEmitter<any>();

  //public faculty_list:any[]=[];
  public facultys: any;
  public is_select_all: boolean = false;

  constructor(private el: ElementRef) {
    this.facultys = this.items;
  }

  ngAfterViewInit(): void {
    console.log('offcanvas: ngAfterViewInit()');
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector(
      '#offcanvas-header-' + this.id
    ) as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');
    button.innerText = 'Dialog Toggle';
    button.setAttribute('id', 'offcanvas-toggle-' + this.id);
    button.setAttribute('data-bs-toggle', 'offcanvas');
    button.setAttribute('data-bs-target', '#offcanvas' + this.id);
    button.setAttribute('hidden', 'hidden');
    parentEl.appendChild(button);
  }

  ngOnChanges() {
    //when @Input() @Output() update
    console.log('offcanvas: ngOnChanges()');
    this.facultys = this.items;
  }

  ngAfterViewChecked() {
    console.log('faculty offcanvas ngAfterViewChecked()');
    this.items;
    let selected_list = this.facultys.filter((item: any) => {
      return item.selected;
    });
    console.log(selected_list);
  }

  async _onSave() {
    let selected_list = await this.facultys.filter((item: any) => {
      return item.selected;
    });

    // selected_list.forEach((item: any) => {
    //   delete item.selected;
    // });

    if (selected_list.length > 0) this.fc?.setValue(selected_list);
    else this.fc?.setValue(null);

    //--close offcanvas--
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector(
      '#offcanvas-toggle-' + this.id
    ) as HTMLElement;
    btnElement.click();
  }
}

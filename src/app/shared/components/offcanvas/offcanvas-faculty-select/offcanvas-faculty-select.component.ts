import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FacultyService } from 'src/app/service/faculty.service';

@Component({
  selector: 'offcanvas-faculty-select',
  templateUrl: './offcanvas-faculty-select.component.html',
  styleUrls: ['./offcanvas-faculty-select.component.scss'],
})
export class OffcanvasFacultySelectComponent {
  id:string = 'offcanvas-faculty-select';
  @Input() fc?: any;
  @Input() title?: string = 'เลือกคณะ/หน่วยงาน';
  //@Input() items: any;
  @Output() onSave = new EventEmitter<any>();

  public facultys: any;
  public facultys_support:any;
  public is_select_all: boolean = false;
  public is_select_all_support: boolean = false;

  constructor(private el: ElementRef, private facultyservice: FacultyService) {
    //this.facultys = this.items;
    this.facultyservice.getall().subscribe({
      next: (res) => {
        //this.facultys = res;
        this.facultys = res.filter((item:any)=>{ return item.faculty_group<4});
        this.facultys_support = res.filter((item:any)=>{ return item.faculty_group==4});
        
        console.log(this.fc.getRawValue());
        if (this.fc.getRawValue()!==null) {
          let facid = this.fc.getRawValue().map((item: any) => {
            return item.faculty_id;
          });
          this.facultys.forEach((item: any) => {
            if (facid.includes(item.faculty_id)) {
              item.selected = true;
            }
          });
        }
        this.onItemselect();
      },
      error: (err) => {
        console.log('faculty api failed!!');
      },
    });
  }

  ngAfterViewInit(): void {
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
  _toggleMe() {
    //--close offcanvas--
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#toggle-' + this.id) as HTMLElement;
    btnElement.click();
  }

  async _onSave() {

    let selected_list = await this.facultys.filter((item: any) => {
      return item.selected;
    });

    let selected_list_support = await this.facultys_support.filter((item: any) => {
      return item.selected;
    });

    const select_list_all = [...selected_list, ...selected_list_support];

    if (select_list_all.length > 0) this.fc?.setValue(select_list_all);
    else this.fc?.setValue(null);

    this._toggleMe();
  }
  
  onItemselect(){
    this.is_select_all = this.facultys.every((item:any)=> item.selected==true);
    this.is_select_all_support = this.facultys_support.every((item:any)=> item.selected==true);
  }

  onSelectall() {
    this.is_select_all = !this.is_select_all;
    this.facultys.forEach((item: any) => {
      item.selected = this.is_select_all;
    });
  }
  onSelectall_support() {
    this.is_select_all_support = !this.is_select_all_support;
    this.facultys_support.forEach((item: any) => {
      item.selected = this.is_select_all_support;
    });
  }
}

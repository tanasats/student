import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.scss']
})
export class EnrollListComponent implements OnChanges {


  @Input() items: any[] = [];
  @Input() title: string ="";
  @Output() _onDelete = new EventEmitter<any>();
  @Output() _onEdit = new EventEmitter<any>();
  
  
  public page_number = 0;
  public page_limit = 20;

  public registeredcount:number=0;

  ngOnChanges(): void {
    if(this.items.length>0){
      console.log("OnChange() @Input() items=",this.items);
      this.registeredcount = this.items.reduce((count,item)=>{ return item.activity_checkin==1?count+1:count;},0);
      console.log(this.registeredcount);
    }
  }

  get first_index() {
    return this.page_number == 0 ? 1 : this.page_number * this.page_limit + 1;
  }

  get last_index() {
    return (
      (this.first_index + this.page_limit <= this.items.length + 1
        ? this.first_index + this.page_limit
        : (this.items.length % this.page_limit) + this.first_index) - 1
    );
  }

  get page_total() {
    return Math.ceil(this.items.length / this.page_limit);
  }

  get isNextDisabled(): boolean {
    return this.last_index >= this.items.length;
  }

  get isPrevDisabled(): boolean {
    return this.first_index <= 1;
  }




}

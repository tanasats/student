import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.scss']
})
export class EnrollListComponent implements OnChanges {


  @Input() items: any[] = [];
  @Input() title: string ="";

  @Input() is_onDelete:boolean=false;
  @Output() onDelete = new EventEmitter<any>();

  @Input() is_onCheckin:boolean=false;
  @Output() onCheckin = new EventEmitter<any>();
  

  public itemsFilter: any[] =[];
  public page_number = 0;
  public page_limit = 20;

  public registeredcount:number=0;
  public _id:any;

  public formfilter: FormGroup;

  constructor(
    private fb:FormBuilder
  ){
    this._id=uuid();
    this.formfilter = this.fb.group({
      activity_checkin:[null,[]],
      studentcode: [null,[]],
      studentname: [null,[]],
    })
  }

  ngOnChanges(): void {
    if(this.items.length>0){
      console.log("OnChange() @Input() items=",this.items);
      this.itemsFilter=this.items;

      this.items.forEach((item)=>{ item.selected=false;  });
      this.registeredcount = this.items.reduce((count,item)=>{ return item.activity_checkin==1?count+1:count;},0);
      console.log(this.registeredcount);
    }
  }

  get first_index() {
    return this.page_number == 0 ? 1 : this.page_number * this.page_limit + 1;
  }

  get last_index() {
    return (
      (this.first_index + this.page_limit <= this.itemsFilter.length + 1
        ? this.first_index + this.page_limit
        : (this.itemsFilter.length % this.page_limit) + this.first_index) - 1
    );
  }

  get page_total() {
    return Math.ceil(this.itemsFilter.length / this.page_limit);
  }

  get isNextDisabled(): boolean {
    return this.last_index >= this.itemsFilter.length;
  }

  get isPrevDisabled(): boolean {
    return this.first_index <= 1;
  }


  public selectAllItems(event:any){
    if(event.currentTarget.checked===true){
      console.log('select all');
      this.itemsFilter.forEach((item)=>{ item.selected=true; })
    }else{
      this.itemsFilter.forEach((item)=>{ item.selected=false; })
    }
  }

  onFilter(){
    let keyword=this.formfilter.value;
    this.itemsFilter = this.items.filter((item)=>{
      return (item.activity_checkin===(keyword.activity_checkin?1:-1) || keyword.activity_checkin===null) 
              && (item.studentcode.startsWith(keyword.studentcode) || keyword.studentcode===null)
              && (item.studentname.includes(keyword.studentname) || keyword.studentname===null)
    })
    console.log(this.itemsFilter);
  }

  clearfilter(){
    this.itemsFilter=this.items;
    this.formfilter.reset();
  }


}

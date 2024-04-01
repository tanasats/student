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
  @Output() onCancelCheckin = new EventEmitter<any>();

  @Output() onCheckinList = new EventEmitter<any>();
  @Output() onCancelCheckinList = new EventEmitter<any>();
  

  public itemsFilter: any[] =[];
  public page_number = 0;
  public page_limit = 20;

  public registeredcount:number=0;
  public _id:any;

  public formfilter: FormGroup;
  public selectcount:number=0;

  public selectMaster:boolean=false;
  public isHasFilter:boolean=false;

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
      this.formfilter.reset();
      this.isHasFilter=false;
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


  public selectAllPage(event:any){
    if(event.currentTarget.checked===true){
      
      this.itemsFilter.forEach((item)=>{ item.selected=false; })
      this.selectcount=0;
      this.itemsFilter.reduce((acc,curr)=>{
        acc+=1;
        if(acc>(this.page_number*this.page_limit) && acc<=(this.page_number*this.page_limit)+this.page_limit){
          curr.selected=true;
          this.selectcount+=1;
        }
        return acc;
      },0)
      console.log('select page has '+this.selectcount+' rows');
    }else{
      this.itemsFilter.forEach((item)=>{ item.selected=false; })
      this.selectcount=0;
    }
  }

  public selectAllItems(){
      this.itemsFilter.forEach((item)=>{ item.selected=true; });
      this.selectcount=this.itemsFilter.length;
  }  

  onFilter(){
    let keyword=this.formfilter.value;
    this.itemsFilter = this.items.filter((item)=>{
      return (item.activity_checkin!==(keyword.activity_checkin?1:-1) || keyword.activity_checkin===null) 
              && (item.studentcode.startsWith(keyword.studentcode) || keyword.studentcode===null)
              && (item.studentname.includes(keyword.studentname) || keyword.studentname===null)
    })
    console.log(this.itemsFilter);
    this.isHasFilter=true;
  }

  clearfilter(){
    this.itemsFilter=this.items;
    this.formfilter.reset();
    this.isHasFilter=false;
  }

  onClickCheckinList(){
    //console.log("onClickCheckinGroup()");
    let itemlist = this.itemsFilter.filter((item)=>{ return item.selected===true})
    //console.log("select: ",itemlist);
    this.onCheckinList.emit(itemlist);
    this.selectcount=0;
    this.selectMaster=false;
  }
  onClickCancelCheckinList(){
    //console.log("onClickCheckinGroup()");
    let itemlist = this.itemsFilter.filter((item)=>{ return item.selected===true})
    //console.log("select: ",itemlist);
    this.onCancelCheckinList.emit(itemlist);
    this.selectcount=0;
    this.selectMaster=false;    
  }

  onClickDeleteList(){
    console.log("onClickDeleteList()")
  }

  onItemCheckboxChange(event:boolean){
    if(event){
      const rowscount = this.itemsFilter.reduce((acc,cur)=>{
        if(cur.selected) acc++;
        return acc;
      },0)
      this.selectcount=rowscount;
      console.log("has select "+rowscount + " rows")
    }
  }

}

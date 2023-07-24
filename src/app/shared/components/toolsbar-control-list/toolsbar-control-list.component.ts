import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toolsbar-control-list',
  templateUrl: './toolsbar-control-list.component.html',
  styleUrls: ['./toolsbar-control-list.component.scss']
})
export class ToolsbarControlListComponent {
@Input() title:any='_TITLE_';
@Output() _onCreate = new EventEmitter<any>();

test(){
  console.log("toolsbar-control-list test()");
  this._onCreate.emit(true);
}
}

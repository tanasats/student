import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPLABEL } from 'src/environments/environment';

@Component({
  selector: 'user-view-table',
  templateUrl: './user-view-table.component.html',
  styleUrls: ['./user-view-table.component.scss'],
})
export class UserViewTableComponent implements OnInit{

  @Input() items: any[]=[];
  @Input() title: any;
  @Input() is_onDelete:boolean=false;
  @Output() onDelete = new EventEmitter<any>();
  public registercount:any;

  
  ngOnInit(): void {

  }

  

}

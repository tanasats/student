import { Component, Input } from '@angular/core';

@Component({
  selector: 'enroll-list-item',
  templateUrl: './enroll-list-item.component.html',
  styleUrls: ['./enroll-list-item.component.scss']
})
export class EnrollListItemComponent {
  @Input() item:any={};
  @Input() itemnumber:number=0;
   
}

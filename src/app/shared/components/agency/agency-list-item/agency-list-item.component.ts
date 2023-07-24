import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'agency-list-item',
  templateUrl: './agency-list-item.component.html',
  styleUrls: ['./agency-list-item.component.scss'],
})
export class AgencyListItemComponent {
  @Input() item: any;
  @Output() _onEdit = new EventEmitter<any>();
  @Output() _onDelete = new EventEmitter<any>();

  public get faculty_name(): string {
    const obj = 'ไม่ระบุ';
    try {
      const obj = JSON.parse(this.item.agency_faculty).faculty_name;
      return obj;
    } catch {
      return obj;
    }
    
  }
}

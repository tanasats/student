import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.scss']
})
export class EnrollListComponent {

  @Input() items: any = [];
  @Input() title: string ="";
  @Output() _onDelete = new EventEmitter<any>();
  @Output() _onEdit = new EventEmitter<any>();

  
  public page_number = 0;
  public page_limit = 20;

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

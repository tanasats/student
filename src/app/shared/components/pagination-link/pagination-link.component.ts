import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination-link',
  templateUrl: './pagination-link.component.html',
  styleUrls: ['./pagination-link.component.scss']
})
export class PaginationLinkComponent {
@Input() currentPage!:number;
@Input() totalPages!:number;
@Input() totalItems!:number;
@Output() _onPageChange = new EventEmitter<any>();
}

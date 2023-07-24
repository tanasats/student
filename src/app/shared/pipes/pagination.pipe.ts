import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(
    data: Array<any> = [],
    page_number: number = 0,
    page_limit: number = 10
  ): any {
    const first_index = page_number == 0 ? 0 : page_number * page_limit;
    const last_index =
      first_index + page_limit > data.length
        ? (data.length % page_limit) + first_index
        : first_index + page_limit;
    return data.slice(first_index, last_index) || [];
  }
}

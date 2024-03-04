import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isExpiredDate'
})
export class IsExpiredDatePipe implements PipeTransform {

  transform(date: any): boolean {
    let dueDate=new Date(date);
    let toDay = new Date();
    return (toDay>dueDate?true:false)
  }

}

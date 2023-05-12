import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore'
})
export class ReadmorePipe implements PipeTransform {

  // transform(value: string, length: number): string {
    transform(value: string): string {  
    const biggestWord = 50;
    let elipses = "<span class='text-muted fs-sm fst-italic'>...รายละเอียด</span>";
    if(value === null || typeof value === "undefined") return value;
    if(value.length <= length) return value;

    //.. truncate to about correct lenght
    //let truncatedText = value.slice(0, length + biggestWord);

    let cutpos = value.lastIndexOf("<readmore>");
    let truncatedText = value.slice(0, cutpos);

    if(value.length< cutpos || cutpos<0) elipses="";
    
    //.. now nibble ends till correct length
    // while (truncatedText.length > length - elipses.length) {

    //     let lastSpace = truncatedText.lastIndexOf(" ");
    //     if(lastSpace === -1) break;
    //     truncatedText = truncatedText.slice(0, lastSpace).replace(/[!,.?;:]$/, '');

    // };
    
    


   return truncatedText + elipses;

  }

}

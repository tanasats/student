import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OffcanvasService {
  constructor() {}

  toggle(id: string) {
    console.log("toggle()");
    //let btnControl = document.querySelector('#offcanvas-toggle-'+id) as HTMLElement;
    let btnControl = document.querySelector('#toggle-'+id) as HTMLElement;
    if(btnControl){ 
      btnControl.click();   
    }else{
      console.log('#'+id+' not found!')
    }
  }

  // show(id: string) {
  //   let el = document.querySelector('#offcanvas' + id) as HTMLElement;
  //   if (el) {
  //     if (!el.classList.contains('show')) {
  //       el.classList.add('show');
  //     }
  //   }
  // }

  // hide(id: string) {
  //   let el = document.querySelector('#offcanvas' + id) as HTMLElement;
  //   if (el) {
  //     if (el.classList.contains('show')) {
  //       el.classList.remove('show');
  //     }
  //   }
  // }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  toggle(id:any){
    let btnControl = document.querySelector('#modal-toggle-'+id) as HTMLElement;
    if(btnControl){ 
      btnControl.click();   
    }else{
      console.log('#modal-toggle-'+id+' not found!')
    }
  }
  
}

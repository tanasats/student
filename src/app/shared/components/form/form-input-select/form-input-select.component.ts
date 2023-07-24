import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input-select',
  templateUrl: './form-input-select.component.html',
  styleUrls: ['./form-input-select.component.scss']
})
export class FormInputSelectComponent {
  @Input() items:any =[];
  @Input() fc:any;
  @Input() label:string='_LABEL_';

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  } 
}

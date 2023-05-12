import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss']
})
export class FormInputTextComponent implements OnInit {
  @Input() fc?:any;
  @Input() is_draft:boolean=false;
  @Input() is_required:boolean=false;

  @Input() is_disabled:boolean=false;
  @Input() is_readonly:boolean=false;
  @Input() label?:string="_LABEL_";
  @Input() value?:string;
  @Input() placeholder:string="";


  constructor(){}

  ngOnInit(): void {
    
  }

  get validateClass(): any {
    return {
      'form-control-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched)
    }
  } 

  get customItemLabelClass(){
    return {
      'form-label-invalid':this.fc?.invalid && (this.fc?.dirty || this.fc?.touched),
      // 'form-label-required':this.is_required,
    }
  }
}

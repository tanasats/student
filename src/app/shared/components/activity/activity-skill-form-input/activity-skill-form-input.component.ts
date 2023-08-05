import { Component, Input } from '@angular/core';
import { APPCONST } from 'src/environments/environment';

@Component({
  selector: 'app-activity-skill-form-input',
  templateUrl: './activity-skill-form-input.component.html',
  styleUrls: ['./activity-skill-form-input.component.scss'],
})
export class ActivitySkillFormInputComponent {
 @Input() fc:any;


   constructor(){ 
    //this.fc.setValue(APPCONST.SKILL);
   }

  toggleChecked(event: any) {
    this.fc.value.find((obj:any)=>{ 
      if(obj.skill_code===event.target.value){
        obj.checked=event.target.checked;
        return obj;
      };
    });
    // this.fc.setValue(this.items);

}

}
import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() items:any;
  



}

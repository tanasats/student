import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toast } from './toast.interface';

@Component({
  selector: 'app-toaster',
  // templateUrl: './toaster.component.html',
  template: `
    <div class="toast toast-{{ toast.type }} show" [style.bottom.px]="(i * 70)+10">
      <!-- h4 class="toast-heading">{{toast.title}}</h4 -->
      <p style="padding-right:10px;">
      <i class="bi me-2" [ngClass]="{'bi-check-circle':toast.type=='success','bi-exclamation-circle':toast.type=='error','bi-exclamation-triangle':toast.type=='warning'}"></i>{{ toast.body }}</p>
      <a class="close" (click)="remove.emit(i)">&times;</a>
    </div>
  `,
  // styleUrls: ['./toaster.component.scss']
  styles: [
    ` .toast {
        position: fixed;
        right: 5px;
        /* width: 300px; */
        width:fit-content;
        height: 50px; /* set [style.bottom.px]="i * (50px+top_space_pixcel)+ bottom_space">*/
        padding: 0.75rem 1.25rem;
        margin-top: 1rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        animation: move 0.5s both;
      }
      .toast-success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }
      .toast-error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
      }

      .toast-warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }
      .close {
        color:gray;
        position: absolute;
        top: 7px;
        right: 10px;
        font-size: 1.5em;
        cursor: pointer;
      }
      .close:hover {
        text-decoration:none;
      }
      .toast-heading {
        margin-top: 10px;
      }
      @keyframes move {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }`,
  ],
})
export class ToasterComponent {
  @Input() toast!: Toast;
  @Input() i!: number;
  @Output() remove = new EventEmitter<number>();
}

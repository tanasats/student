import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'offcanvas-test',
  templateUrl: './offcanvas-test.component.html',
  styleUrls: ['./offcanvas-test.component.scss'],
})
export class OffcanvasTestComponent {
  id = 'offcanvas-test';
  @Input() title: string = 'Offcanvas title';
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    console.log('offcanvas: ngAfterViewInit()');
    let parentEl = (<HTMLElement>this.el.nativeElement).querySelector(
      '#' + this.id
    ) as HTMLElement;
    // add control toggle model button
    var button = document.createElement('button');
    button.innerText = 'Offcanvas Toggle';
    button.setAttribute('id', 'toggle-' + this.id);
    button.setAttribute('data-bs-toggle', 'offcanvas');
    button.setAttribute('data-bs-target', '#' + this.id);
    button.setAttribute('hidden', 'hidden');
    parentEl.appendChild(button);
  }
  _toggleMe() {
    //--close offcanvas--
    let btnElement = (<HTMLElement>this.el.nativeElement).querySelector('#toggle-' + this.id) as HTMLElement;
    btnElement.click();
  }

  _onSave() {
    // your code -----

    this._toggleMe();
  }
}

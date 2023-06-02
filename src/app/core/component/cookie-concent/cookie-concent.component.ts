import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-concent',
  templateUrl: './cookie-concent.component.html',
  styleUrls: ['./cookie-concent.component.scss']
})
export class CookieConcentComponent {
  public isConsented: boolean = false;

  constructor(){
    this.isConsented = (this.getCookie('COOKIE_CONSENT')==='1')
    console.log("isConsent:",this.isConsented);
  }



  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}

private deleteCookie(name:string) {
    this.setCookie(name, '', -1);
}

private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

private consent(isConsent: boolean):any {
    if (!isConsent) {
        return this.isConsented;
    } else if (isConsent) {
        this.setCookie('COOKIE_CONSENT', '1', 1);
        this.isConsented = true;
    }
}

_onConsent(){
    this.consent(true);
}

}

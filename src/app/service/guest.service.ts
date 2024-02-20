import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private endpoint = environment.endpoint + '/guest';
  constructor(private http: HttpClient) {}

  get httpOptions() {
    //let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders,
    };
  }

  get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data; charset=utf-8',
      'Cache-Control': 'no-cache',
      'x-access-token': token,
    });
  }

  private handleError(error: any) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // Client side error
      // console.log("Client error !!");
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      // console.log("Server error !!");
      if (error instanceof HttpErrorResponse) {
        console.log('error is HttpErrorResponse', error);
        switch (error.status) {
          case 0: //"Http failure response: 0 Unknown Error"
            errorMsg = 'เกิดข้อผิดพลาด! ในการเข้าถึงบริการ Service API';
            break;
          case 400: 
            errorMsg = error.message;
            if (error.error.message) errorMsg = error.error.message;
            break;
          case 403: // "Forbidden"
            errorMsg = error.message;
            if (error.error.message) errorMsg = error.error.message;
            break;
          default:
            errorMsg = error.statusText;
        }
      } else {
        errorMsg = error;
      }
    }
    return throwError(() => {
      return errorMsg;
    });
  }

  //--- Service Methode ---
  activity(): Observable<any> {
    return this.http
      .get(this.endpoint + '/activitys', this.httpOptions)
      .pipe(catchError(this.handleError));
  }






  
}

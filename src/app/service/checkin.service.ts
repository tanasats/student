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
export class CheckinService {

  private endpoint = environment.endpoint+'/checkin';
  constructor(private http: HttpClient) {}

  private get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders,
    };
  }

  private get httpHeaders() {
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
        // console.log("error is HttpErrorResponse");
        switch(error.status){
          case 0: //"Http failure response: 0 Unknown Error"
              errorMsg="เกิดข้อผิดพลาด! ในการเข้าถึงบริการ Service API";
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
  checkin(activity_id:number,enroll_token:string): Observable<any> {
    return this.http
      .put(this.endpoint + '/' + activity_id + '/' + enroll_token,[], this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  cancelcheckin(activity_id:number,enroll_token:string): Observable<any> {
    return this.http
      .delete(this.endpoint + '/' + activity_id + '/' + enroll_token, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  checkinlist(datas:any):Observable<any>{
    console.log(datas);
    const shinkdatas = datas.map((item:any)=>{
      return {'studentcode':item.studentcode,'enroll_token':item.enroll_token}
    })

    return this.http
    .put(this.endpoint + '/list', shinkdatas, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
 
  cancelcheckinlist(datas:any):Observable<any>{
    console.log(datas);
    const shinkdatas = datas.map((item:any)=>{
      return {'studentcode':item.studentcode,'enroll_token':item.enroll_token}
    })

    return this.http
    .put(this.endpoint + '/cancel', shinkdatas, this.httpOptions)
    .pipe(catchError(this.handleError));
  }


}

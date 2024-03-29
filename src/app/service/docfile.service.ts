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
export class DocfileService {
  private endpoint = environment.endpoint+'/document';
  private get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders
    };
  }
  private get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
        //'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data; charset=utf-8',
        'Authorization': 'Basic ' + btoa('tanasat.s@msu.ac.th:sudjing'),
        'Cache-Control': 'no-cache',
        'x-access-token': token,
      });
  } 

  private handleError(error: any) {
    let errorMsg: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      if (error instanceof HttpErrorResponse) {
        if (error.status==0){
          errorMsg= "Network Error !";
        } else if (error.error.message) {
          errorMsg = error.error.message;
        } else if (error.statusText) {
          errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        } else {
          errorMsg = error.error;
        }
      } else {
        errorMsg = error;
      }
    }
    return throwError(() => {
      return errorMsg;
    });
  }

  constructor(private http: HttpClient) {}


  upload(datas: any): Observable<any> {
    return this.http
      .post(this.endpoint+ '/upload', datas, this.httpOptions)  
      .pipe(catchError(this.handleError));
  }

  getbytable(table_name:any,table_id:any,user_id:any){
    return this.http
    .get(this.endpoint+'/'+table_name+'/'+table_id+'/'+user_id,this.httpOptions)
    .pipe(catchError(this.handleError));
  }







}

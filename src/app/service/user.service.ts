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
export class UserService {
  private endpoint = environment.endpoint+'/user';
  constructor(private http: HttpClient) {}

  get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
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
    //console.log("xxxxxxx");
    console.log("error:",error);

    if (error.error instanceof ErrorEvent) {
      // Client side error
      console.log("Client error !!");
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      console.log("Server error !!");
      if (error instanceof HttpErrorResponse) {
        console.log("error is HttpErrorResponse");
        // if (error.error.message) {
        //   errorMsg = error.error.message;
        // } else {
        //   errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        // }
        switch(error.status){
          case 0: //"Http failure response for http://localhost:3200/api/user/all: 0 Unknown Error"
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

  getall(): Observable<any> {
    return this.http
      .get(this.endpoint + 's', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(datas: any): Observable<any> {
    return this.http
      .put(this.endpoint + '/' + datas.username, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  delete(id: any): Observable<any> {
    return this.http
      .delete(this.endpoint + '/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  create(datas: any): Observable<any> {
    return this.http
      .post(this.endpoint, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  getbyusername(username:string): Observable<any> {
    return this.http
      .get(this.endpoint + '/'+username, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getbyid(id:string): Observable<any> {
    return this.http
      .get(this.endpoint + '/id/'+id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

} //class

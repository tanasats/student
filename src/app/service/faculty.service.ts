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

export class FacultyService {
  private endpoint = environment.endpoint+'/faculty';
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
  getall(): Observable<any> {
    return this.http
      .get(this.endpoint + 's', this.httpOptions)
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

  update(datas: any): Observable<any> {
    return this.http
      .put(this.endpoint + '/' + datas.faculty_id, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


}

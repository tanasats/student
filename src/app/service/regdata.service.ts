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
export class RegdataService {

  private endpoint = environment.regdataapi;

  private get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders
    };
  }

  private get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
        'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data; charset=utf-8',
        //'Authorization': 'Basic ' + btoa('tanasat.s@msu.ac.th:sudjing'),
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYXRhLm1zdS5hYy50aCIsImlhdCI6MTcwOTIzNTM4MywiZXhwIjoxNzM1NjY0NDAwLCJzdWIiOiJ0YW5hc2F0LnNAbXN1LmFjLnRoIiwibmFtZSI6IlRhbmFzYXQgU3VkamluZyIsImVtYWlsIjoidGFuYXNhdC5zQG1zdS5hYy50aCJ9.bkeuI8MJW1oMZQsBifp9UP9CsK5sDqXk59jsHPqEEXI",
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

  studentinfo(studentcode: string): Observable<any> {
    const data = {"studentcode":studentcode};
    console.log('get student data: ', data);
    return this.http
      .post(this.endpoint + '/student', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}

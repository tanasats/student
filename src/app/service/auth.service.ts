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
  providedIn: 'root',
})
export class AuthService {
  private endpoint = environment.endpoint + '/auth';
  private get httpOptions() {
    return {
      headers: this.httpHeaders,
    };
  }

  private get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data; charset=utf-8',
      Authorization: 'Basic ' + btoa('tanasat.s@msu.ac.th:sudjing'),
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
        if (error.status == 0) {
          //errorMsg = 'Http failure response';
          errorMsg=error.message;
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

  //--- Methode ---

  signin(data: any): Observable<any> {
    //console.log('app_sign service: ', data);
    return this.http
      .post(this.endpoint + '/signin', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  tokenizer(): Observable<any> {
    return this.http
      .get(this.endpoint + '/tokenizer', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  me(): Observable<any> {
    return this.http
      .get(this.endpoint + '/me', this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  changerole(role_id:number): Observable<any> {
    return this.http
    .get(this.endpoint + '/changerole/'+role_id, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  register(data: any): Observable<any> {
    console.log('register user service: ', data);
    return this.http
      .post(this.endpoint + '/register', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}

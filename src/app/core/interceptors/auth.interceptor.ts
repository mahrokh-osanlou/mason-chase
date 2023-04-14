import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    if (window.location.pathname !== '/authentication') {
      if (error.status === 401) {
        window.location.href = '/authentication';
      } else if (error.status === 403){
        window.location.href = '/authentication';
      }
    }
    return throwError(() => error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clone: any = request;
    return next.handle(clone)
      .pipe(
        catchError(this.handleError)
      );
  }
}

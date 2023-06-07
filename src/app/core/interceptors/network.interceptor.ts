import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { GeneralService } from "../services/general.service";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(
    private generalService: GeneralService
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.generalService.setLoader(true);
    return next.handle(request).pipe(
      map(res => {
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        let objError = error? error.error.Errors[0]: null;
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          console.log("this is client side error");
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log(objError, "this is server side error");
          errorMsg = objError.code > 0 ? `Error Code: ${objError.code}`: "";
          errorMsg += `Response Code: ${error.status}, Message: ${objError? objError.Message : error.statusText}`;
        }
        this.generalService.showFeedback(errorMsg);
        return throwError(() => error);
      }),
      finalize(() => {
        // hide the loading progress bar
        this.generalService.setLoader(false);
      })
    );
  }
}

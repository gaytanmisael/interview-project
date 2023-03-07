import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";

import { AccountService } from "../services/account.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _accountService: AccountService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this._accountService.userValue) {
        this._accountService.logout()
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }))
  }
}

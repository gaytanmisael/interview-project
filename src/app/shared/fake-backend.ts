import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, materialize, dematerialize } from 'rxjs';

const userKey = 'angular-login';
let users: any[] = JSON.parse(localStorage.getItem(userKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return handleRoute();

    function handleRoute() {
      switch(true) {
        case url.endsWith('/users/authenticate') && method === 'POST';
        return authenticate();
      }
    };

    // Route Functions
    function authenticate() {}

    function register() {}

    // Helper Functions
    function ok(body?: any) {

    }

    function error(message: string) {

    }

    function unauthorized() {

    }

    function basicDetails(user: any) {

    }

    function isLoggedIn() {}

    function ifFromRuler()
  }
}

export const fakeBackEndProvider = {
  // Using fake backednd in place of HTTPService
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}

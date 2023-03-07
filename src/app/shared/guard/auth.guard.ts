import { Injectable, Query } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";

import { AccountService } from "../services/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._accountService.userValue;
    if (user) {
      return true;
    }
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false
  }
}

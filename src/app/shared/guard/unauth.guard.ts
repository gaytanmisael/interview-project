import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "@services/account.service";

@Injectable({ providedIn: 'root' })
export class UnAuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._accountService.userValue;
    if (user) {
      this._router.navigate(['/products']);
      return true;
    }
    return false;
  }
}

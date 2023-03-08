import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs'

import { AccountService } from '@services/account.service'
import { AlertService } from '@services/alert.service'

@Component({
  selector: 'login',
  templateUrl: './login.html',
  host: {
    class: 'login'
  }
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _account: AccountService,
    private _alert: AlertService
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this._alert.clear();

    // Stop here if form is invalid
    if (this.form.invalid) return;

    this.loading = true;
    this._account.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe({
      next: () => {
        const returnUrl = this._ar.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigateByUrl(returnUrl);
      },
      error: error => {
        this._alert.error(error);
        this.loading = false;
      }
    });
  }
}

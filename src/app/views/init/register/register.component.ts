import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs";

import { AccountService } from "@services/account.service";
import { AlertService } from "@services/alert.service";

@Component({
  selector: 'signup',
  templateUrl: './register.html',
  host: {
    class: 'register'
  }
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public _title: Title,
    private _fb: FormBuilder,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _account: AccountService,
    private _alert: AlertService
  ) {
    this._title.setTitle('Register');
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {}

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this._alert.clear();
    if (this.form.invalid) return;

    this.loading = true;
    this._account.register(this.form.value).pipe(first()).subscribe({
      next: () => {
        this._alert.success('Registration Successful', { keepAfterRouteChange: true });
        this._router.navigate(['/login'], { relativeTo: this._ar });
      },
      error: error => {
        this._alert.error(error);
        this.loading = false;
      }
    });
  }
}

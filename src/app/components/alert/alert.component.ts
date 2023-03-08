import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from 'src/app/shared/interface/alert';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private _router: Router, private _alert: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this._alert.onAlert(this.id).subscribe((alert) => {
      if (!alert.message) {
        this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

        this.alerts.forEach((x) => delete x.keepAfterRouteChange);
        return;
      }

      this.alerts.push(alert);
      if (alert.autoClose) {
        setTimeout(() => {
          this.removeAlert(alert);
        }, 3000);
      }
    });

    this.routeSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._alert.clear(this.id);
      }
    });
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;
    if (this.fade) {
      alert.fade = true;
      setTimeout(() => {
        this.alerts = this.alerts.filter((x) => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter((x) => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'shadow-lg'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-error',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push('fade')
    }

    return classes.join(' ');
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}

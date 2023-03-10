import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'init-layout',
  templateUrl: './init.html'
})
export class InitLayoutComponent {
  year: number = new Date().getFullYear();

  constructor(public _router: Router) {}

  ngOnInit() {}
}

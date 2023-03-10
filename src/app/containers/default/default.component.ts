import { Component } from "@angular/core";

@Component({
  selector: 'default-layout',
  templateUrl: './default.html'
})
export class DefaultComponent {
  year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}
}

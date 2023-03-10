import { Component } from "@angular/core";
import { Taxes } from '@arrays/taxes';

@Component({
  selector: 'default-layout',
  templateUrl: './default.html'
})
export class DefaultComponent {
  year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {
    const ifTaxesExist = localStorage.getItem('taxes') ? true : false;
    if (!ifTaxesExist) {
      const taxes = JSON.stringify(Taxes);
      localStorage.setItem('taxes', taxes);
    }
  }
}

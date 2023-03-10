import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { Tax } from "@interfaces/tax";

@Component({
  selector: 'taxes',
  templateUrl: './taxes.html'
})
export class TaxesComponent implements OnInit {
  taxesForm: FormGroup;
  taxes = JSON.parse(localStorage.getItem('taxes')!);

  constructor(
    public _title: Title,
    private _fb: FormBuilder,
  ) {
    this._title.setTitle('Taxes');
    this.taxesForm = this._fb.group({
      items: this._fb.array([])
    })
  }

  ngOnInit(): void {
    let count = 0;
    this.taxes.forEach(async (tax: Tax) => {
      this.addNewLine();
      const taxRate = tax.rate * 100;
      const current = this.lineTaxes().at(count);
      current.patchValue({
        name: tax.name,
        original: tax.original,
        tax_rate: taxRate
      })
      count++;
    })
  }

  addTax(index: number) {
    const current = this.lineTaxes().at(index);
    let name = current.get('name')?.value;
    let rate = current.get('tax_rate')?.value;
    rate = (rate / 100)
    const tax: Tax = {
      name,
      original: false,
      rate
    }
    this.taxes.push(tax);
    localStorage.setItem('taxes', JSON.stringify(this.taxes));
  }

  newTaxLine(): FormGroup{
    return this._fb.group({
      name: [''],
      original: [false],
      tax_rate: ['']
    });
  }

  lineTaxes(): FormArray {
    return this.taxesForm.get('items') as FormArray;
  }

  addNewLine() {
    this.lineTaxes().push(this.newTaxLine());
  }

  removeLine(index: number) {
    const i = this.taxes[index];
    const { original } = i;

    if (!original) {
      const idx = this.taxes.indexOf(index);
      const x = this.taxes.splice(idx, 1)
      localStorage.setItem('taxes', JSON.stringify(this.taxes));
    }

    this.lineTaxes().removeAt(index);
  }
}


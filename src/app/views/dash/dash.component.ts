import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { BehaviorSubject, Observable } from "rxjs";

import { Tax } from "@interfaces/tax";
import { Taxes } from "@arrays/taxes";
import { Products } from "@arrays/products";

@Component({
  selector: 'dash',
  templateUrl: './dash.html'
})
export class DashComponent implements OnInit {
  products: FormGroup;
  taxes = Taxes;
  constructor(
    public _title: Title,
    private _fb: FormBuilder
  ) {
    this._title.setTitle('Products')
    this.products = this._fb.group({
      items: this._fb.array([])
    });
  }

  ngOnInit(): void {
    this.addNewLine();
  }

  onSubmit() {}

  newItemLine(): FormGroup {
    return this._fb.group({
      name: [''],
      quantity: [''],
      unit_price: [''],
      line_amount: ['']
    });
  }

  lineItems(): FormArray {
    return this.products.get('items') as FormArray;
  }

  addNewLine() {
    this.lineItems().push(this.newItemLine());
  }

  removeLine(index: number) {
    this.lineItems().removeAt(index);
  }
}

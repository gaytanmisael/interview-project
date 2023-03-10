import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'products',
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {
  products: FormGroup;
  taxes = JSON.parse(localStorage.getItem('taxes')!);

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
      tax_rate: ['', [Validators.required]],
      unit_price: [''],
      line_amount: ['', [Validators.required]]
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

  updateLineAmount(index: number, taxTrigger: boolean = false) {
    const current = this.lineItems().at(index);
    let unit_price = current.get('unit_price')?.value;
    let qty = current.get('quantity')?.value;
    let tax_rate = current.get('tax_rate')?.value;

    const line_amount = qty * unit_price + ((unit_price * tax_rate) * qty);

    current.patchValue({
      line_amount: line_amount.toLocaleString('en-us', { style: 'currency', currency: 'USD' })
    })
  }
}

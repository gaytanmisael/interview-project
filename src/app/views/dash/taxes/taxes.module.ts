import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TaxesComponent } from "./taxes.component";
import { TaxesRouting } from "./taxes.routing";

@NgModule({
  declarations: [TaxesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaxesRouting
  ],
  providers: []
})
export class TaxesModule {}

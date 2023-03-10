import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TaxesComponent } from "./taxes.component";

const routes = [
  { path: '', component: TaxesComponent }
] satisfies Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRouting {}

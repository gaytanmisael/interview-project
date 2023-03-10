import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from '@angular/router';

import { ProductsComponent } from "./products.component";

const routes = [
  { path: '', component: ProductsComponent }
] satisfies Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRouting {}

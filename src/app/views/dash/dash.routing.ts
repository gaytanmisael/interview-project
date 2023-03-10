import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from '@angular/router';

import { DashComponent } from "./dash.component";

const routes = [
  { path: '', component: DashComponent }
] satisfies Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRouting {}

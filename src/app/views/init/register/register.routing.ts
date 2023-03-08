import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from "./register.component";

const routes = [
  { path: '', component: RegisterComponent }
] satisfies Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRouting {}

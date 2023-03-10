import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashRouting } from "./dash.routing";
import { DashComponent } from "./dash.component";

@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashRouting
  ],
  providers: []
})
export class DashModule {}

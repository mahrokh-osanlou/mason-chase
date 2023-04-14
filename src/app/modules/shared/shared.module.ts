import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../@material/material.module";
import { ApiResultComponent } from "./components/api-result/api-result.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ApiResultComponent],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ApiResultComponent],

  providers: [],
})
export class SharedModule {}

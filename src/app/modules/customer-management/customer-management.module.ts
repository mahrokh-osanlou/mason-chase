import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routedComponents, routes } from './customer-management-routing.module';
import { MaterialModule } from '../@material/material.module';

@NgModule({
  declarations: [...routedComponents],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers:[]
})
export class CustomerManagementModule {}

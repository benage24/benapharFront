import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductModuleRoutingModule } from './product-module-routing.module';
import { ProductModuleComponent } from './product-module.component';


@NgModule({
  declarations: [
    ProductModuleComponent
  ],
  imports: [
    CommonModule,
    ProductModuleRoutingModule
  ]
})
export class ProductModuleModule { }

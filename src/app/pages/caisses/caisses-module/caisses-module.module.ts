import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaissesModuleRoutingModule } from './caisses-module-routing.module';
import { CaissesModuleComponent } from './caisses-module.component';


@NgModule({
  declarations: [
    CaissesModuleComponent
  ],
  imports: [
    CommonModule,
    CaissesModuleRoutingModule
  ]
})
export class CaissesModuleModule { }

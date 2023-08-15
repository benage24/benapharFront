import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductModuleComponent } from './product-module.component';
import { AddProductComponent } from '../add-product/add-product.component';


const routes: Routes = [{ path: '', component: ProductModuleComponent,children:[
  {path:'add', component:AddProductComponent } ,
  {path:'liste', component:ProductListComponent } ,
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }

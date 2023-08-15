import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [{ path: '', component: MainComponent, children: [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../../../pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },

  {
    path: 'product',
    loadChildren: () =>
      import('../../../pages/products/product-module/product-module.module').then(
        (m) => m.ProductModuleModule
      ),
  },


  {
    path: 'caisse',
    loadChildren: () =>
      import('../../../pages/caisses/caisses-module/caisses-module.module').then(
        (m) => m.CaissesModuleModule
      ),
  },





 

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

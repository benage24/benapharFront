import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'main', loadChildren: () => import('./components/layout/main/main.module').then(m => m.MainModule) },

  { path: 'pages/products/product-module', loadChildren: () => import('./pages/products/product-module/product-module.module').then(m => m.ProductModuleModule) },

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },





  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

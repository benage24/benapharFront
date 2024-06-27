import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { CaisseReportComponent } from '../caisses/caisse-report/caisse-report.component';
import { SaleListComponent } from '../caisses/sale-list/sale-list.component';
import { ExpenseListComponent } from '../caisses/expense-list/expense-list.component';

const routes: Routes = [{ path: '', component: DashboardsComponent,children:[
  { path: 'product',component:ProductListComponent },
  { path: 'sales',component:SaleListComponent },
  { path: 'expense',component:ExpenseListComponent },
  { path: '',component:CaisseReportComponent },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }

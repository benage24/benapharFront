import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaissesModuleComponent } from './caisses-module.component';
import { CaisseReportComponent } from '../caisse-report/caisse-report.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { SaleListComponent } from '../sale-list/sale-list.component';
import { AddSaleComponent } from '../add-sale/add-sale.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

const routes: Routes = [{ path: '', component: CaissesModuleComponent,children:[
  {path:'report', component: CaisseReportComponent } ,
  {path:'expense', component: ExpenseListComponent } ,
  {path:'add-expense', component: AddExpenseComponent } ,
  {path:'sales', component: SaleListComponent } ,
  {path:'add-sales', component: AddSaleComponent } ,
 
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaissesModuleRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor, TokenInterceptorProvider } from './interceptors/token.interceptor';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/dialogs/loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogInfosComponent } from './components/dialogs/dialog-infos/dialog-infos.component';
import { CaisseListComponent } from './pages/caisses/caisse-list/caisse-list.component';
import { CaisseReportComponent } from './pages/caisses/caisse-report/caisse-report.component';
import { ExpenseListComponent } from './pages/caisses/expense-list/expense-list.component';
import { SaleListComponent } from './pages/caisses/sale-list/sale-list.component';
import { AddSaleComponent } from './pages/caisses/add-sale/add-sale.component';
import { AddExpenseComponent } from './pages/caisses/add-expense/add-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    DialogInfosComponent,
   
    CaisseListComponent,
   
 

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

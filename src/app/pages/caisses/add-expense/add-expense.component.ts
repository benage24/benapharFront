import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AddSale } from 'src/app/entities/add-sale';
import { ExpenseAdd } from 'src/app/entities/expense-add';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class AddExpenseComponent {
  expense:ExpenseAdd=new ExpenseAdd()
  productList:any
  isUpdate:boolean=false
  
  constructor(
    public dialog: MatDialog,
       private appConfig: AppConfigService,
        private caiseService:CaisseService,
        private router: Router,
         private route: ActivatedRoute,
         private subscriptionService: SubscriptionService
         
         ){
  
  }
  saveSale() {
    this.appConfig.onStartWaiting();
    this.caiseService.saveExpense(this.expense).subscribe({
      next: (res: any) => {
         this.appConfig.onStartWaiting();
        if (res.status == '400') {
           AppUtilitie.openInfoDialog(this.dialog, res.status.message);
        } else {
          this.router.navigate(
            ['main/caisse/expense'],
            { replaceUrl: true }
          );
          
           AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
          this.expense = new ExpenseAdd();
        }
        // console.log("respoane",res)
      },
      error: (e:any) => {
         this.appConfig.onStopWaiting();
        AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
      },
    });
  }
}

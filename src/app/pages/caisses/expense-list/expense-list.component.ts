import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseList } from 'src/app/entities/expense-lis';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {
  expenseList!:ExpenseList[]
  itemId!: number;
  isUpdate!:boolean

  private Subscriptions: Subscription = new Subscription();
  constructor(public dialog: MatDialog, 
    private appConfig: AppConfigService, 
    private caiseService:CaisseService,private router: Router,
     private route: ActivatedRoute,
     private subscriptionService: SubscriptionService

     ){

  }

  ngOnInit(){
    this.  getExpenseList()
  }

  getExpenseList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.getExpenset().subscribe({
        next:(res: ExpenseList[])=>{
           this.appConfig.onStopWaiting();
            this.expenseList = res;
            console.log("rrtr",res);
        },
        error: (e) => {
              console.log(e);
               this.appConfig.onStopWaiting();
            },

      })
    )
   
  }


  deleteExpense(id:number){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.deleteExpense(id).subscribe({
        next:()=>{
          this.appConfig.onStopWaiting();
          this.expenseList = this.expenseList.filter(
          (productItem:any) => productItem.id !== id
        );
        },

        error: (e) => {
              console.log(e);
               this.appConfig.onStopWaiting();
            },
      })
    )

   
  }
}

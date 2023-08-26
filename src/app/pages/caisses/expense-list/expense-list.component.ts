import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseList } from 'src/app/entities/expense-lis';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SaleResponse } from 'src/app/entities/sale-reponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class ExpenseListComponent {
  expenseList!:any
  itemId!: number;
  isUpdate!:boolean
  next: boolean = false;
  prev: boolean = false;
  page=1
  pages: Array<number> = new Array<number>();
  startDate!:string
  endDate!:string
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

  nextPage() {
    if (this.next) {
      this.page++;
      this.  getExpenseList()
    }
  }
  
  // Navigate to the previous page
  prevPage() {
    if (this.prev) {
      this.page=this.page-1;
      this.  getExpenseList()
    }
  }
  goToPage(pageNumber: number) {
    this.page = pageNumber;
  
    this.  getExpenseList()
  }
  
  getExpenseList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.getCaisse(`expense?page=${this.page}`).subscribe({
        next:(res: SaleResponse)=>{
           this.appConfig.onStopWaiting();
            this.expenseList = res.results;
            this.next=res.next
            this.prev=res.previous
            console.log("rrtr",res);
            const totalPages = Math.ceil(res.count/res.page_size );

            // Populate the pages array
            this.pages = Array.from({ length: totalPages }, (_, i) => i+1 );
    
        },
        error: (e) => {
              console.log(e);
               this.appConfig.onStopWaiting();
            },

      })
    )
   
  }

  filterExpenseList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.getCaisse(`expense/filter?start_date=${this.startDate}&end_date=${this.endDate}`).subscribe({
        next:(res: SaleResponse)=>{
           this.appConfig.onStopWaiting();
            this.expenseList = res.results;
            this.next=res.next
            this.prev=res.previous
            console.log("rrtr",res);
            const totalPages = Math.ceil(res.count/res.page_size );

            // Populate the pages array
            this.pages = Array.from({ length: totalPages }, (_, i) => i+1 );
    
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

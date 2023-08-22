import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleList } from 'src/app/entities/sale-list';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent {
  saleList!:SaleList[]
  itemId!: number;
  isUpdate!:boolean
 

  constructor(
    public dialog: MatDialog,
       private appConfig: AppConfigService,
        private caiseService:CaisseService,
        private router: Router,
         private route: ActivatedRoute,
         private subscriptionService: SubscriptionService
         
         ){
  
  }

  ngOnInit(){
    this.getSalesList()
  }

  
  
  getSalesList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.getSales().subscribe({
        next:(res: SaleList[])=>{
           this.appConfig.onStopWaiting();
            this.saleList = res;
            console.log("sales",res);
        },
        error: (e) => {
              console.log(e);
               this.appConfig.onStopWaiting();
            },

      })
    )
   
  }







  deleteSale(id:number){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.deleteExpense(id).subscribe({
        next:()=>{
          this.appConfig.onStopWaiting();
          this.saleList = this.saleList.filter(
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

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleList } from 'src/app/entities/sale-list';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SaleResponse } from 'src/app/entities/sale-reponse';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent {
  saleList:any
  itemId!: number;
  isUpdate!:boolean
  next: boolean = false;
  prev: boolean = false;
  page=1
  pages: Array<number> = new Array<number>();

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

  nextPage() {
    if (this.next) {
      this.page++;
      this.getSalesList()
    }
  }
  
  // Navigate to the previous page
  prevPage() {
    if (this.prev) {
      this.page=this.page-1;
      this.getSalesList()
    }
  }
  goToPage(pageNumber: number) {
    this.page = pageNumber;
  
    this.getSalesList()
  }
  
  getSalesList(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.getCaisse(`sales/list?page=${this.page}`).subscribe({
        next:(res: SaleResponse)=>{
           this.appConfig.onStopWaiting();
            this.saleList = res.results;
    
            this.next=res.next
            this.prev=res.previous
            console.log("sales",res);
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







  deleteSale(id:number){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(
      this.caiseService.deleteSale(id).subscribe({
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

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { ReportCaisse } from 'src/app/entities/caisse-report';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProductService } from 'src/app/services/product-service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-caisse-report',
  templateUrl: './caisse-report.component.html',
  styleUrls: ['./caisse-report.component.scss']
})
export class CaisseReportComponent {
  reportList!:any
  itemId!: number;
  isUpdate!:boolean
  pagination: any = {};
  next: boolean = false;
  prev: boolean = false;
  page=1
  pages: Array<number> = new Array<number>();
  // pages: number[] = []; // Initialize the array
  pageSize: number = 10; // Set a constant page size
  private Subscriptions: Subscription = new Subscription();
  constructor(public dialog: MatDialog,
       private appConfig: AppConfigService, 
       private caiseService:CaisseService,
       private router: Router,
       private subscriptionService: SubscriptionService,
        private route: ActivatedRoute,){
   
  }

  ngOnInit(){
    
    this.  getCaisseReport()
    const link=this.next
    console.log("link",link);
    this.getPageRange()
    // this. getPaginationLink()
  }

 
  getPageRange() {
    const totalPages = Math.ceil(this.pagination.count / this.pagination.page_size);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
 
  // getCaisseReport(){
  //   this.appConfig.onStartWaiting();
  //   this.subscriptionService.add(this.caiseService.getReport().subscribe({
  //     next:(res: ReportCaisse[])=>{
  //               this.appConfig.onStopWaiting();
  //      this.reportList = res;
   
  //     },
  //         error: (e) => {
      
  //        this.appConfig.onStopWaiting();
  //     },
  //   }))


  // }
 
 // Navigate to the next page
 nextPage() {
  if (this.next) {
    this.page++;
    this.getCaisseReport();
  }
}

// Navigate to the previous page
prevPage() {
  if (this.prev) {
    this.page=this.page-1;
    this.getCaisseReport();
  }
}
goToPage(pageNumber: number) {
  this.page = pageNumber;

  this.getCaisseReport();
}
  getCaisseReport(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(this.caiseService.getCaisse(`report?page=${this.page}`).pipe(
      finalize(() => {
        this.appConfig.onStopWaiting();
      })
    ).subscribe({
      next:(res )=>{
        this.appConfig.onStopWaiting();
        if (res !== null && res !== undefined) {
          this.reportList = res        as ReportCaisse[];
          this.next=res.next
          this.prev=res.previous
          this.pagination=res.count
          console.log("sold",res  );
           // Update page number based on the current response
          //  this.page = res.results.current_page;

        // Calculate total number of pages
        const totalPages = Math.ceil(res.count/res.page_size );

        // Populate the pages array
        this.pages = Array.from({ length: totalPages }, (_, i) => i+1 );

        console.log(totalPages,this.page);
        
          
        }
      },
      error: (e) => {
        // Handle error
      },
    }))
  }


  // getPageRange() {
    
  //   if (this.pagination.count) return [];

  //   const totalPages = Math.ceil(this.pagination.count / this.pagination.page_size);
  //   // console.log(totalPages);
    
  //   return Array.from({ length: totalPages }, (_, i) => i + 1);
  // }

  // Generate the URL for a specific page
  // getPaginationLink() {
  //   //return `environment.baseUrl?page=${page}`;
  //  const link=`${environment.baseUrl}/caisse/report?page=${2}`
  //   console.log("link",link);
    
  //   return link
  // }

    
}

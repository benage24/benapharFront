import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { ReportCaisse } from 'src/app/entities/caisse-report';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProductService } from 'src/app/services/product-service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-caisse-report',
  templateUrl: './caisse-report.component.html',
  styleUrls: ['./caisse-report.component.scss']
})
export class CaisseReportComponent {
  reportList!:ReportCaisse[]
  itemId!: number;
  isUpdate!:boolean
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

  getCaisseReport(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(this.caiseService.getReport().pipe(
      finalize(() => {
        this.appConfig.onStopWaiting();
      })
    ).subscribe({
      next:(res )=>{
        this.appConfig.onStopWaiting();
        if (res !== null && res !== undefined) {
          this.reportList = res as ReportCaisse[];;
        }
      },
      error: (e) => {
        // Handle error
      },
    }))
  }


    
}

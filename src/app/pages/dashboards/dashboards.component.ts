import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ReportCaisse } from 'src/app/entities/caisse-report';
import { ChartData } from 'src/app/entities/chart';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent {
   graph: any[] = [];
  sale:any
  apiData: number[] = [];
  graphData!:["urjtjk"]
  data ={
    labels: [],
    data: []
  }
  solde:any
  chartData: any = {};
  currentMonth: any;
  constructor(public dialog: MatDialog,
    private appConfig: AppConfigService, 
    private caiseService:CaisseService,
    private router: Router,
    private subscriptionService: SubscriptionService,
     private route: ActivatedRoute,){
      const currentDate = new Date();
      this.currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });

}

ngOnInit(){
    
  this.currentMonthGraph()

}


    // currentMonthGraph(){
    //   this.appConfig.onStartWaiting();
    //   this.subscriptionService.add(this.caiseService.getCaisse(`report/count`).pipe(
    //     finalize(() => {
    //       this.appConfig.onStopWaiting();
    //     })
    //   ).subscribe({
    //     next:(res )=>{
    //       this.appConfig.onStopWaiting();
    //       if (res !== null && res !== undefined) {
    //         this.graph = res      as ReportCaisse[];
    //         this.solde = this.graph;
    //         this.chartData = res;
    //         this.createChart();
    //         console.log("sold",this.chartData,"pages" );
    
            
      
          
            
    //       }
    //     },
    //     error: (e) => {
    //       // Handle error
    //     },
    //   }))
    // }
    currentMonthGraph() {
      this.appConfig.onStartWaiting();
      this.subscriptionService.add(
        this.caiseService.getCaisse(`report/count`).pipe(
          finalize(() => {
            this.appConfig.onStopWaiting();
          })
        ).subscribe({
          next: (res) => {
            this.appConfig.onStopWaiting();
            if (res !== null && res !== undefined) {
              // Map keys here
              const transformedData = {
                "DEPENSE": res.total_expenses,
                "VENTE": res.total_sum_sale,
                 "TOTAL": res.total_profit,
                "SOLDE": res.total_solde,
               
             
                "	EPARGNE": res.total_sum_savings
              };
    
              this.graph = [transformedData] 
              this.solde = this.graph;
              this.chartData = transformedData;
              this.createChart();
        
            }
          },
          error: (e) => {
            // Handle error
          },
        })
      );
    }
    

    createChart(): void {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
     
    }
}

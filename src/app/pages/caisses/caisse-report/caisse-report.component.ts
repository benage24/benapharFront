import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { LineChartComponent } from 'src/app/charts/line-chart/line-chart.component';
import { AddSale } from 'src/app/entities/add-sale';
import { ReportCaisse } from 'src/app/entities/caisse-report';
import { ExcelFile } from 'src/app/entities/excel';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { ExcelReaderService } from 'src/app/services/excel-reader.service';
import { ProductService } from 'src/app/services/product-service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-caisse-report',
  templateUrl: './caisse-report.component.html',
  styleUrls: ['./caisse-report.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,LineChartComponent],
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
  startDate!:string
  endDate!:string
  expenseCount!:number
  soldeCount!:number
  totalCount!:number
  salesCount!:number
  totalSaving!:number
  graph: any[] = [];
  sale:any
  apiData: number[] = [];
  graphData!:["urjtjk"]
  // data ={
  //   labels: [],
  //   data: []
  // }
  solde:any
  chartData: any = {};
  currentMonth: any;

  selectedSheet!: string;
  excelFileData:ExcelFile=new ExcelFile()
  excelData: { [sheet: string]: any[] } = {};
  data_to_save:any
  selectedFile!: File;
  // pages: number[] = []; // Initialize the array
  pageSize: number = 10; // Set a constant page size
  private Subscriptions: Subscription = new Subscription();
 barChartOptions1: any = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        barPercentage: 0.6, // Adjust the width of the bars
        categoryPercentage: 0.8, // Adjust the space between bars
      },
      y: {
        stacked: true,
        barPercentage: 0.6, // Adjust the width of the bars
        categoryPercentage: 0.8, // Adjust the space between bars
      },
    },
    legend: {
      position: 'bottom', // This line sets the legend position to bottom
    },
  };
  public barChartType1: string = 'bar';
  public barChartLabels1: string[] = ['Dépense', 'Épargne', 'Solde', 'Total', 'Vente'];

  public barChartData1: any[] = [
    {
      data: [],
      label: '',
      backgroundColor:''
    }
  ];
  constructor(public dialog: MatDialog,
       private appConfig: AppConfigService, 
       private caiseService:CaisseService,
       private router: Router,
       private excelReaderService: ExcelReaderService,
       private subscriptionService: SubscriptionService,
        private route: ActivatedRoute,){
          const currentDate = new Date();
          this.currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  }

  ngOnInit(){
    this.currentMonthGraph()
    this.  getCaisseReport()
    const link=this.next
    console.log("link",link);
    this.getPageRange()
   // this.  getCaisseCount()
    // this.getHistory()
    // this. getPaginationLink()
  }

  data = {
    labels: ['January', 'February', 'March'],
    label: 'Sales',
    data: [65, 59, 80],
  };

  updateData() {
    this.data = {
      labels: ['April', 'May', 'June'],
      label: 'Revenue',
      data: [45, 75, 60],
    };
  }
  getPageRange() {
    const totalPages = Math.ceil(this.pagination.count / this.pagination.page_size);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
 
 
 
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
          this.reportList = res.results        as ReportCaisse[];
          this.next=res.next
          this.prev=res.previous
          this.pagination=res.count
          console.log("sold",this.reportList,"pages",this.next  );
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


  filterCaisseReport(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(this.caiseService.getCaisse(`report/filter?start_date=${this.startDate}&end_date=${this.endDate}`).pipe(
      finalize(() => {
        this.appConfig.onStopWaiting();
      })
    ).subscribe({
      next:(res )=>{
        this.appConfig.onStopWaiting();
        if (res !== null && res !== undefined) {
          this.reportList = res.results?.data        as ReportCaisse[];
          this.next=res.next
          this.prev=res.previous
          this.pagination=res.count
          this.soldeCount=res.results.sums.total_solde
          this.expenseCount=res.results.sums.total_expenses
          this.totalCount=res.results.sums.total_profit
          this.salesCount=res.results.sums.total_sum_sale
          this.totalSaving=res.results.sums.total_sum_savings
          console.log("filter",res  );
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



  getCaisseCount(){
    this.appConfig.onStartWaiting();
    this.subscriptionService.add(this.caiseService.getCaisse(`report/count/`).pipe(
      finalize(() => {
        this.appConfig.onStopWaiting();
      })
    ).subscribe({
      next:(res )=>{
        this.appConfig.onStopWaiting();
        if (res !== null && res !== undefined) {
          this.reportList = res.results
          this.soldeCount=res.total_solde
          this.expenseCount=res.total_expenses
          this.totalCount=res.total_profit
          this.salesCount=res.total_sum_sale
          this.totalSaving=res.total_sum_savings

          console.log("sold",res  );
       
          
        }
      },
      error: (e) => {
        // Handle error
      },
    }))
  }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file name",this.selectedFile.name);
    
    this.readExcel()

    // this.uploadFile()
  }




  readExcel(): Promise<{ [key: string]: any[] }> {
    return new Promise((resolve, reject) => {
      if (this.selectedFile) {
        this.excelReaderService.readExcelss(this.selectedFile).then(
          async ({ sheetNames, data }) => {
            console.log('Sheet names:', sheetNames);
            console.log('Excel data:', data);
  
            // Initialize an empty object to store the sheet data
            const data_to_save: { [key: string]: any[] } = {};
  
            // Use Promise.all to wait for all promises to resolve
            await Promise.all(
              sheetNames.map(async (sheetName) => {
                try {
                  const sheetData = await this.excelReaderService.readExcels(this.selectedFile, sheetName);
                  data_to_save[sheetName] = sheetData;
                } catch (error) {
                  console.error(`Error reading data for sheet ${sheetName}:`, error);
                  reject(error); // Reject the promise if an error occurs for any sheet
                }
              })
            );
  
            // Resolve the promise with the final data_to_save object
            resolve(data_to_save);
          },
          (error) => {
            console.error('Error reading Excel file:', error);
            reject(error);
          }
        );
      } else {
        reject('No file selected');
      }
    });
  }
  

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
              "EPARGNE": res.total_sum_savings
            };
  
            this.graph = [transformedData] 
            
         //   this.data.labels=[transformedData] 
      
            this.chartData = transformedData;
            console.log("comut",this.chartData)
            this.createChart();
            this.updateChart(this.chartData)
      
          }
        },
        error: (e) => {
          // Handle error
        },
      })
    );
  }
  
  updateChart(data: any): void {
    this.barChartData1 = [
      {
        data: [
          data.DEPENSE,
          data.EPARGNE,
          data.SOLDE,
          data.TOTAL,
          data.VENTE
        ],
        label:  this.currentMonth,
        backgroundColor:'#11B07A',
        hoverBackgroundColor: '#11B07A',
      }
    ];
  }
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
   
  }  
}

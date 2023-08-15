import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-caisse-report',
  templateUrl: './caisse-report.component.html',
  styleUrls: ['./caisse-report.component.scss']
})
export class CaisseReportComponent {
  reportList:any
  itemId!: number;
  isUpdate!:boolean
  constructor(public dialog: MatDialog,   private appConfig: AppConfigService, private caiseService:CaisseService,private router: Router, private route: ActivatedRoute,){
   this.  getCaisseReport()
  }


  getCaisseReport(){
    this.appConfig.onStartWaiting();

    this.caiseService.getReport().subscribe(
      (res: any) => {
        this.appConfig.onStopWaiting();
       this.reportList = res;
       console.log("rrtr",res);
       
      },
      (erro:any) => {
        this.appConfig.onStopWaiting();

        console.error('Error fetching data:', );
      }
    );
  }
}

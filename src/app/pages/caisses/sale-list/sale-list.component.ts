import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent {
  saleList:any
  itemId!: number;
  isUpdate!:boolean
  constructor(public dialog: MatDialog,   private appConfig: AppConfigService, private caiseService:CaisseService,private router: Router, private route: ActivatedRoute,){
   this.  getSalesList()
  }


  getSalesList(){
    this.appConfig.onStartWaiting();

    this.caiseService.getSales().subscribe(
      (res: any) => {
        this.appConfig.onStopWaiting();
       this.saleList = res;
       console.log("rrtr",res);
       
      },
      (erro:any) => {
        this.appConfig.onStopWaiting();

        console.error('Error fetching data:', );
      }
    );
  }
}

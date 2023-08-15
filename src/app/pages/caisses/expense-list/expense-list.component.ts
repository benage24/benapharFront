import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {
  expenseList:any
  itemId!: number;
  isUpdate!:boolean
  constructor(public dialog: MatDialog,   private appConfig: AppConfigService, private caiseService:CaisseService,private router: Router, private route: ActivatedRoute,){
   this.  getExpenseList()
  }


  getExpenseList(){
    this.appConfig.onStartWaiting();

    this.caiseService.getExpenset().subscribe(
      (res: any) => {
        this.appConfig.onStopWaiting();
       this.expenseList = res;
       console.log("rrtr",res);
       
      },
      (erro:any) => {
        this.appConfig.onStopWaiting();

        console.error('Error fetching data:', );
      }
    );
  }
}

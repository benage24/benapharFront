import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationError, validate } from 'class-validator';
import { Addproduct } from 'src/app/entities/add-product';
import { AddSale } from 'src/app/entities/add-sale';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';
import { AppConfigService } from 'src/app/services/app.service';
import { CaisseService } from 'src/app/services/caisse.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class AddSaleComponent {
sale:AddSale=new AddSale()
productList:any
isUpdate:boolean=false
saleErrors: any = {};
constructor(
  public dialog: MatDialog,
     private appConfig: AppConfigService,
      private caiseService:CaisseService,
      private router: Router,
       private route: ActivatedRoute,
       private subscriptionService: SubscriptionService
       
       ){

}



async validateOrReject() {
  try {
    await validate(this.sale).then((errors: any) => {
      if (Array.isArray(errors) && errors.length > 0) throw errors;
      else this.saveSale();
    });
  } catch (errors) {
    if (Array.isArray(errors)) {
      this.saleErrors = {};
      errors.map((error: ValidationError) => {
        this.saleErrors[error.property] = error.constraints?.['isNotEmpty'];
      });
    } else {
      AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
    }
  }
}

saveSale() {
  console.log("ttttttttttttttttttttttttttttttttttttttttt");
  this.appConfig.onStartWaiting();
  this.caiseService.saveSale(this.sale).subscribe({
    next: (res: any) => {
       this.appConfig.onStartWaiting();
      if (res.status == '400') {
         AppUtilitie.openInfoDialog(this.dialog, res.status.message);
      } else {
        this.router.navigate(
          ['main/caisse/sales'],
          { replaceUrl: true }
        );
        console.log("ttttttttttttttttttttttttttttttttttttttttt");
        
         AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
        this.sale = new AddSale();
      }
      // console.log("respoane",res)
    },
    error: (e:any) => {
       this.appConfig.onStopWaiting();
      AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
    },
  });
}
}

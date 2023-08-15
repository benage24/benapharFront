import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product-service';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor, TokenInterceptorProvider } from 'src/app/interceptors/token.interceptor';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppConfigService } from 'src/app/services/app.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/dialogs/loading/loading.component';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,FormsModule, MatDialogModule],
  providers: [TokenInterceptorProvider],

  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productList:any
  itemId!: number;
  isUpdate!:boolean
  constructor(public dialog: MatDialog,   private appConfig: AppConfigService, private productService:ProductService,private router: Router, private route: ActivatedRoute,){
   
  }
 
  ngOnInit(): void {
   
    this.getProduct()

  }
  openDialog() {
    const dialogRef = this.dialog.open(LoadingComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getProduct(){
    this.appConfig.onStartWaiting();

    this.productService.getProductList().subscribe(
      (res: any) => {
        this.appConfig.onStopWaiting();
       this.productList = res;
       console.log("rrtr",res);
       
      },
      (erro:any) => {
        this.appConfig.onStopWaiting();

        console.error('Error fetching data:', );
      }
    );
  }

  deleteProduct(id:number){
    console.log("product id",id);
     this.productService.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.appConfig.onStopWaiting();
        this.productList = this.productList.filter(
          (productItem:any) => productItem.id !== id
        );
    
        // this.productList = res;
      },
      error: (e) => {
        console.log(e);
         this.appConfig.onStopWaiting();
      },
    });
  }
    
  
  // getProductList() {
  //     console.log("rrtrffffff",res);
  //   // this.appConfigService.onStartWaiting();
  //   this.productService.find$('list/').subscribe({
  //     next: (res: any) => {
  //       // this.appConfigService.onStopWaiting();
  //       console.log("rrtrffffff",res);
  //       this.productList = res;
  //     },
  //     error: (e) => {
  //       console.log(e);
  //       // this.appConfigService.onStopWaiting();
  //     },
  //   });
  // }
  navigateToUpdate(item: any) {
    this.router.navigate(['/main/product/add'], {
      queryParams: {
        product: JSON.stringify(item)
      }
    });
   const x= this.productService.setUpdateMode(true)
   console.log("xxxx",x);
   
  }
  // navigateToUpdate(itemId: number) {
  //   this.router.navigate(['/main/product/add', itemId]);
  // }

}


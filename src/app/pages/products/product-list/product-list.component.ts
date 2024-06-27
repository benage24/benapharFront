import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product-service';
import { FormsModule } from '@angular/forms';
import {
  TokenInterceptor,
  TokenInterceptorProvider,
} from 'src/app/interceptors/token.interceptor';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppConfigService } from 'src/app/services/app.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/dialogs/loading/loading.component';
import { AddProductDialogComponent } from 'src/app/components/dialogs/add-product-dialog/add-product-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { RefreshPageService } from 'src/app/services/refresh-page.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  providers: [TokenInterceptorProvider],

  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productList: any;
  itemId!: number;
  isUpdate!: boolean;
  constructor(
    public dialog: MatDialog,
    private appConfig: AppConfigService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogservice: DialogService,
    private refreshPageService:RefreshPageService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  openDialog() {
    const dialogRef = this.dialog.open(LoadingComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // getProduct() {
  //   this.appConfig.onStartWaiting();
  //   this.productService.find$('product/').subscribe({
  //     next: (res: any) => {
  //       this.appConfig.onStopWaiting();
  //       // this.productList = res.results
  //       console.log(' agents ==>', res);
  //     },
  //     error: (e) => {
  //       console.log("error",e);
  //       this.appConfig.onStopWaiting();
  //     },
  //   });
  // }
  getProduct() {
    this.appConfig.onStartWaiting();
    this.productService.find$('product').subscribe({
      next: (res: any) => {
        this.appConfig.onStopWaiting();
        console.log('Response from API:', res); // Log the entire response object
        if (res && res.results) {
          // Assuming 'results' is the property containing the product list
          this.productList = res.results;
        }
      },
      error: (e) => {
        console.error('Error fetching product:', e); // Log any errors
        this.appConfig.onStopWaiting();
      },
      complete: () => {
        console.log('Subscription completed.'); // Log when the subscription completes
      },
    });
  }

  deleteProduct(id: string) {
    console.log('product id', id);
    this.appConfig.onStartWaiting();

    this.productService.delete$(`product/${id}`).subscribe({
      next: (res: any) => {
        this.appConfig.onStopWaiting();
        this.productList = this.productList.filter(
          (productItem: any) => productItem.id !== id
        );

        // this.productList = res;
      },
      error: (e) => {
        console.log(e);
        this.appConfig.onStopWaiting();
      },
    });
  }

  confirmationDialog(id: string) {
    this.dialogservice
      .openConfirmDialog('Êtes-vous sûr de vouloir supprimer cet produit ?')
      .afterClosed()
      .subscribe((res) => {
        //if the result is true call delete mesure method
        if (res) {
          this.deleteProduct(id); // delete mesure method
          this.getProduct()
        }
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
        product: JSON.stringify(item),
      },
    });
    const x = this.productService.setUpdateMode(true);
    console.log('xxxx', x);
  }
  // navigateToUpdate(itemId: number) {
  //   this.router.navigate(['/main/product/add', itemId]);
  // }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      height: '80%',
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('it works');
  }
}

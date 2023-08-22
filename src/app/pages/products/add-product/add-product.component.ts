import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Addproduct } from 'src/app/entities/add-product';
import { ProductService } from 'src/app/services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppConfigService } from 'src/app/services/app.service';
import { AppUtilitie } from 'src/app/utilities/app-utility';
import { MatDialog } from '@angular/material/dialog';
import { AppFeeback } from 'src/app/enums/app-feedback.enum';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
product:Addproduct=new Addproduct()
productList:any
isUpdate:boolean=false
// updatedItem: any = {};
itemId:any
constructor(private dialog: MatDialog,private appConfig: AppConfigService, private productService:ProductService,private route: ActivatedRoute,private router: Router){
  // if(this.route.snapshot.queryParams['user']){
  //   this.getProduct();
  // }
  // this.route.queryParams.subscribe(params => {
  //   const productData = JSON.parse(params['product']);
  //   this.updatedItem = { ...productData };
  // });
  this.route.queryParams.subscribe(param=>{
    this.itemId=param['product'];
    if(this.itemId){
      this.isUpdate = true;
      // this.product.name=this.itemId.name;
      // this.product.quantity=this.itemId.quantity
      this.fetchItemDetails();
      console.log('item ',  this.itemId);
    }
  })

 

  // this.route.params.subscribe(params => {
  //   this.itemId = +params['product']; // Retrieve the itemId from route parameters
  //   this.fetchItemDetails();
  // });
}
// getProduct(){
 
//   this.productService.getProductList().subscribe(
//     (res: any) => {
//      this.productList = res;
//      console.log("rrtr",res);
     
//     },
//     (erro:any) => {
//       console.error('Error fetching data:', );
//     }
//   );
// }

// saveProduct() {
//   this.productService.save$(this.product, 'create/').subscribe({
//     next: (res: any) => {
//       if (res ) { // Assuming the response has a 'status' field
//         console.log(res);
        
//         this.router.navigate(['main/product/liste'], { replaceUrl: true });
//         this.product = new Addproduct();
//       } else {
//         console.error('Save failed:', res?.message);
//       }
//     },  
//     error: (err) => {
//       console.error('Network error:', err);
//     },
//   });
// }

fetchItemDetails() {
  this.productService.detailProduct(this.itemId).subscribe(
    (response) => {
      this.product = response;
      console.log( this.product );
      
    },
    (error) => {
      console.error('Error fetching item details', error);
    }
  );
}

saveProduct() {
  console.log("ttttttttttttttttttttttttttttttttttttttttt");
  this.appConfig.onStartWaiting();
  this.productService.saveProduct(this.product).subscribe({
    next: (res: any) => {
       this.appConfig.onStartWaiting();
      if (res.status == '400') {
         AppUtilitie.openInfoDialog(this.dialog, res.status.message);
      } else {
        this.router.navigate(
          ['main/product/liste'],
          { replaceUrl: true }
        );
        console.log("ttttttttttttttttttttttttttttttttttttttttt");
        
         AppUtilitie.openInfoDialog(this.dialog, AppFeeback.SAVE_SUCCESS);
        this.product = new Addproduct();
      }
      // console.log("respoane",res)
    },
    error: (e:any) => {
       this.appConfig.onStopWaiting();
      AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
    },
  });
}

update(){
  this.productService.updateProduct(this.itemId,this.product).subscribe({
    next: (res: any) => {
      this.appConfig.onStartWaiting();
      if (res.status == '400') {
         AppUtilitie.openInfoDialog(this.dialog, res.status.message);
      } else {
        this.router.navigate(
          ['main/product/liste'],
          { replaceUrl: true }
        );
        
         AppUtilitie.openInfoDialog(this.dialog, AppFeeback.UPDATE_SUCCESS);
        this.product = new Addproduct();
      }
      // console.log("respoane",res)
    },
    error: (e:any) => {
       this.appConfig.onStopWaiting();
      AppUtilitie.openInfoDialog(this.dialog, AppFeeback.NETWORK_ERROR);
    },
  });
}


switchRequest(){
  if(this.isUpdate){
    this.update()
  }else{
    this.saveProduct()
  }
 }
}

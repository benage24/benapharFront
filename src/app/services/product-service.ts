import { Injectable } from "@angular/core";
import { Repository } from "../repository/repository";
import { Product } from "../entities/product";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable, catchError, throwError } from "rxjs";
import { Addproduct } from "../entities/add-product";


@Injectable({
    providedIn: 'root',
})

export class ProductService extends Repository<Product|Addproduct>{

    constructor(
        private http: HttpClient,
        private router: Router,
        protected override _http: HttpClient,
        //  protected _router: Router,
         protected _router: Router,
        // protected override _dialog: MatDialog
    ) {
        super(http, `${environment.baseUrl}/product-api`);
    }

  
 
    // getProductList(path:any): Observable<any> {
    //   const url = `${environment.baseUrl}/product/${path}`;
    //   return this.http.get(url).pipe(
    //     catchError(error => {
    //         if (error.status === 401) {
    //           // Redirect to login page if session expired
    //           this.router.navigate(['/login']);
    //         }
    //         return throwError(error);
    //       })
    //   );
    // }


    //   saveProduct(data:any,path:any): Observable<any> {
    //     const url = `${environment.baseUrl}/product/${path}`;
    //     return this.http.post(url,data).pipe(
    //       catchError(error => {
    //           if (error.status === 401) {
    //             // Redirect to login page if session expired
    //             this.router.navigate(['/login']);
    //           }
    //           return throwError(error);
    //         })
    //     );

      
    // }

    // deleteProduct(id: number,path:any): Observable<any> {
    //   const url = `${environment.baseUrl}/product/${path}/${id}`;
    //   return this.http.delete(url).pipe(
    //     catchError(error => {
    //       if (error.status === 401) {
    //         this.router.navigate(['/login']);
    //       }
    //       return throwError(error);
    //     })
    //   );
    // }

    // detailProduct(id: number,path:any): Observable<any> {
    //   const url = `${environment.baseUrl}/product/${path}/${id}`;
    //   return this.http.get(url).pipe(
    //     catchError(error => {
    //       if (error.status === 401) {
    //         this.router.navigate(['/login']);
    //       }
    //       return throwError(error);
    //     })
    //   );
    // }

    // updateProduct(id: number, data: any): Observable<any> {
    //   const url = `${environment.baseUrl}/product/product/${id}/`;
    //   return this.http.put(url, data).pipe(
    //     catchError(error => {
    //       if (error.status === 401) {
    //         this.router.navigate(['/login']);
    //       }
    //       return throwError(error);
    //     })
    //   );
    // }
  
    setUpdateMode(flag: boolean) {
      const isEditMode = flag;
    }
    
  
}

import { Injectable } from "@angular/core";
import { Repository } from "../repository/repository";
import { Product } from "../entities/product";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable, catchError, throwError } from "rxjs";


@Injectable({
    providedIn: 'root',
})

export class ProductService extends Repository<Product>{

    constructor(
        private http: HttpClient,
        private router: Router,
        protected override _http: HttpClient,
        //  protected _router: Router,
         protected _router: Router,
        // protected override _dialog: MatDialog
    ) {
        super(http, `${environment.baseUrl}/product`);
    }

  
 
    getProductList(): Observable<any> {
      const url = `${environment.baseUrl}/product/list`;
      return this.http.get(url).pipe(
        catchError(error => {
            if (error.status === 401) {
              // Redirect to login page if session expired
              this.router.navigate(['/login']);
            }
            return throwError(error);
          })
      );
    }


    saveProduct(data:any): Observable<any> {
      const url = `${environment.baseUrl}/product/create/`;
      return this.http.post(url,data).pipe(
        catchError(error => {
            if (error.status === 401) {
              // Redirect to login page if session expired
              this.router.navigate(['/login']);
            }
            return throwError(error);
          })
      );

      
    }

    deleteProduct(id: number): Observable<any> {
      const url = `${environment.baseUrl}/product/delete/${id}`;
      return this.http.delete(url).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    }

    detailProduct(id: number): Observable<any> {
      const url = `${environment.baseUrl}/product/${id}`;
      return this.http.get(url).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    }

    updateProduct(id: number, data: any): Observable<any> {
      const url = `${environment.baseUrl}/product/update/${id}/`;
      return this.http.put(url, data).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    }
  
    setUpdateMode(flag: boolean) {
      const isEditMode = flag;
    }
    
  
}
